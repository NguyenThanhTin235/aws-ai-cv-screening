export interface SendOtpResult {
  success: boolean;
  messageId?: string;
  sender?: string;
  recipient?: string;
  message?: string;
}

export async function sendOtpViaSES(email: string, otp: string): Promise<SendOtpResult> {
  try {
    const res = await fetch('/api/auth/send-ses-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return {
        success: true,
        messageId: data.messageId,
        sender: data.sender,
        recipient: data.recipient,
        message: data.message || 'Đã gửi qua AWS SES thành công'
      };
    }

    return {
      success: false,
      messageId: data.messageId,
      sender: data.sender,
      message: data.message || 'Không thể gửi email qua AWS SES'
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi kết nối tới dịch vụ SES';
    return {
      success: false,
      message
    };
  }
}

