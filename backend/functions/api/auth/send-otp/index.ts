import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as crypto from 'crypto';
import * as https from 'https';

interface SendOtpRequest {
  email: string;
  otp: string;
  fullName?: string;
}

function sign(key: Buffer | string, msg: string): Buffer {
  return crypto.createHmac('sha256', key).update(msg).digest();
}

function getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string): Buffer {
  const kDate = sign('AWS4' + key, dateStamp);
  const kRegion = sign(kDate, regionName);
  const kService = sign(kRegion, serviceName);
  const kSigning = sign(kService, 'aws4_request');
  return kSigning;
}

async function sendSesEmail(
  senderEmail: string,
  recipientEmail: string,
  otp: string,
  region: string,
  accessKeyId: string,
  secretAccessKey: string
): Promise<{ messageId: string }> {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append('Action', 'SendEmail');
    params.append('Version', '2010-12-01');
    params.append('Source', senderEmail);
    params.append('Destination.ToAddresses.member.1', recipientEmail);
    params.append('Message.Subject.Data', `[CloudJob] Mã xác thực OTP kích hoạt tài khoản: ${otp}`);
    params.append('Message.Subject.Charset', 'UTF-8');
    params.append(
      'Message.Body.Html.Data',
      `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mã xác thực CloudJob</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6f8; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0;">
          
          <!-- Top Gradient Accent Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #00271d 0%, #095744 50%, #87cbb2 100%); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header with Logo -->
          <tr>
            <td style="padding: 32px 36px 20px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 38px; height: 38px; background-color: #095744; border-radius: 9px; text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-size: 20px; font-weight: 800; line-height: 38px; display: inline-block;">✦</span>
                        </td>
                        <td style="padding-left: 12px;">
                          <div style="font-size: 21px; font-weight: 800; color: #00271d; letter-spacing: -0.02em; line-height: 1.1;">
                            Cloud<span style="color: #095744;">Job</span>
                          </div>
                          <div style="font-size: 10.5px; font-weight: 700; color: #6b7280; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 2px;">
                            AI CV Screening Portal
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #e6f4ef; color: #095744; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.02em;">
                      XÁC THỰC OTP
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="border-top: 1px solid #f1f5f9;"></div>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 28px 36px 32px 36px;">
              <h1 style="font-size: 20px; font-weight: 800; color: #00271d; margin: 0 0 12px 0; letter-spacing: -0.01em;">
                Xác thực địa chỉ Email của bạn
              </h1>
              <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
                Chào bạn, bạn vừa thực hiện đăng ký tài khoản tại <strong>CloudJob</strong>. Để hoàn tất kích hoạt tài khoản và bảo vệ quyền riêng tư theo tiêu chuẩn an toàn đám mây, vui lòng nhập mã xác thực một lần (OTP) dưới đây:
              </p>

              <!-- OTP Code Highlight Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #f0fbf7 0%, #e6f7f0 100%); border: 1.5px dashed #87cbb2; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td align="center" style="padding: 24px 20px;">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #095744; text-transform: uppercase; margin-bottom: 8px;">
                      MÃ XÁC THỰC MỘT LẦN (OTP)
                    </div>
                    <div style="font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace; font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #003e2f; padding: 4px 0;">
                      ${otp}
                    </div>
                    <div style="display: inline-block; margin-top: 8px; font-size: 12px; color: #047857; font-weight: 600; background-color: rgba(255, 255, 255, 0.7); padding: 3px 12px; border-radius: 12px;">
                      ⏱ Hiệu lực trong vòng 10 phút
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Security Advice Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 16px;">
                    <div style="font-size: 12.5px; color: #475569; line-height: 1.55;">
                      🔒 <strong>Lưu ý bảo mật:</strong> Tuyệt đối không chia sẻ mã này cho bất kỳ ai, kể cả nhân viên hỗ trợ của CloudJob. Dữ liệu hồ sơ cá nhân của bạn được mã hóa qua <strong>AWS KMS</strong> và tuân thủ chặt chẽ <strong>Nghị định 13/2023/NĐ-CP</strong>.
                    </div>
                  </td>
                </tr>
              </table>

              <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0;">
                Nếu bạn không thực hiện yêu cầu đăng ký này, vui lòng an tâm bỏ qua email này hoặc thông báo cho chúng tôi qua địa chỉ <a href="mailto:support@cloudjob.vn" style="color: #095744; font-weight: 600; text-decoration: none;">support@cloudjob.vn</a>.
              </p>
            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 36px; text-align: center;">
              <div style="font-size: 12px; font-weight: 700; color: #095744; margin-bottom: 6px;">
                CloudJob — Nền tảng Tuyển dụng & Sàng lọc CV Nhân tài Cloud/DevOps
              </div>
              <div style="font-size: 11px; color: #94a3b8; line-height: 1.5; margin-bottom: 12px;">
                Vận hành trên nền tảng AWS Serverless • Amazon SES (${region}) • AWS Bedrock Claude 3.5 Sonnet
              </div>
              <div style="font-size: 11px; color: #94a3b8;">
                © 2026 CloudJob Vietnam. Toàn bộ bản quyền được bảo lưu.
              </div>
            </td>
          </tr>

        </table>

        <!-- Anti-Spam / Legal Subtext -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; margin-top: 16px;">
          <tr>
            <td align="center" style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
              Email này được gửi tự động tới địa chỉ <strong>${recipientEmail}</strong> để phục vụ xác thực bảo mật tài khoản.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    );
    params.append('Message.Body.Html.Charset', 'UTF-8');

    const postData = params.toString();
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substring(0, 8);
    const host = `email.${region}.amazonaws.com`;

    const method = 'POST';
    const canonicalUri = '/';
    const canonicalQuerystring = '';
    const payloadHash = crypto.createHash('sha256').update(postData).digest('hex');

    const canonicalHeaders = `content-length:${Buffer.byteLength(postData)}\ncontent-type:application/x-www-form-urlencoded\nhost:${host}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'content-length;content-type;host;x-amz-date';

    const canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${region}/ses/aws4_request`;
    const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;

    const signingKey = getSignatureKey(secretAccessKey, dateStamp, region, 'ses');
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

    const authorizationHeader = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const options = {
      hostname: host,
      port: 443,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'X-Amz-Date': amzDate,
        'Authorization': authorizationHeader
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          const match = data.match(/<MessageId>(.*?)<\/MessageId>/);
          const messageId = match ? match[1] : 'sent-via-ses';
          resolve({ messageId });
        } else {
          const errMatch = data.match(/<Message>(.*?)<\/Message>/);
          const errMsg = errMatch ? errMatch[1] : data;
          reject(new Error(`SES Error (${res.statusCode}): ${errMsg}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('SES Connection Timeout'));
    });

    req.write(postData);
    req.end();
  });
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  try {
    const body: SendOtpRequest = JSON.parse(event.body || '{}');
    const { email, otp } = body;

    if (!email || !otp) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: 'Thiếu email hoặc mã OTP' })
      };
    }

    const region = process.env.AWS_REGION || 'us-east-1';
    const senderEmail = process.env.SES_SENDER_EMAIL || 'tinthanhn81@gmail.com';
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';

    const { messageId } = await sendSesEmail(
      senderEmail,
      email,
      otp,
      region,
      accessKeyId,
      secretAccessKey
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Mã xác thực đã được gửi thành công qua AWS SES',
        messageId,
        sender: senderEmail,
        recipient: email
      })
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi gửi email qua AWS SES';
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message })
    };
  }
};

