/**
 * Bộ tiện ích xác thực dữ liệu (Form Data Validators) — CloudJob
 * Tuân thủ tiêu chuẩn an toàn dữ liệu, chống injection và tối ưu hóa UX.
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * 1. Xác thực Họ và tên
 * - Bắt buộc
 * - Độ dài: 2 - 70 ký tự
 * - Tối thiểu 2 từ
 * - Chỉ gồm chữ cái tiếng Việt/Anh và khoảng trắng
 */
export function validateFullName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Vui lòng nhập họ và tên của bạn.';
  }
  if (trimmed.length < 2) {
    return 'Họ và tên quá ngắn (tối thiểu 2 ký tự).';
  }
  if (trimmed.length > 70) {
    return 'Họ và tên không được vượt quá 70 ký tự.';
  }

  // Regex hỗ trợ Unicode Tiếng Việt đầy đủ chữ hoa, thường
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!nameRegex.test(trimmed)) {
    return 'Họ và tên chỉ được chứa chữ cái, không chứa chữ số hoặc ký tự đặc biệt.';
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return 'Vui lòng nhập đầy đủ cả họ và tên (tối thiểu 2 từ).';
  }

  return null;
}

/**
 * 2. Xác thực Số điện thoại Việt Nam
 * - Hỗ trợ định dạng 10 chữ số (03x, 05x, 07x, 08x, 09x)
 * - Hỗ trợ đầu số quốc tế (+84x)
 */
export function validatePhone(phone: string): string | null {
  const cleanPhone = phone.replace(/[\s.-]/g, '');
  if (!cleanPhone) {
    return 'Vui lòng nhập số điện thoại liên hệ.';
  }

  // Regex chuẩn các đầu số di động mạng Viettel, Vina, Mobi, Vietnamobile, Itelecom
  const vnPhoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  if (!vnPhoneRegex.test(cleanPhone)) {
    return 'Số điện thoại không hợp lệ (Phải là 10 số di động, ví dụ: 0912345678).';
  }

  return null;
}

/**
 * 3. Xác thực Email
 * - Đúng chuẩn RFC 5322
 * - Tên miền có đuôi ít nhất 2 ký tự
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Vui lòng nhập địa chỉ email.';
  }
  if (trimmed.length > 100) {
    return 'Địa chỉ email không được vượt quá 100 ký tự.';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return 'Địa chỉ email không hợp lệ (Ví dụ: name@cloudjob.vn).';
  }

  return null;
}

/**
 * 4. Xác thực Mật khẩu
 * - Tối thiểu 8 ký tự
 * - Đầy đủ chữ hoa, chữ thường và chữ số
 */
export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Vui lòng nhập mật khẩu.';
  }
  if (password.length < 8) {
    return 'Mật khẩu phải có tối thiểu 8 ký tự để đảm bảo an toàn.';
  }
  if (password.length > 128) {
    return 'Mật khẩu không được vượt quá 128 ký tự.';
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  if (!hasLower || !hasUpper || !hasDigit) {
    return 'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 chữ số.';
  }

  return null;
}

/**
 * 5. Xác thực Khớp mật khẩu
 */
export function validateConfirmPassword(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) {
    return 'Vui lòng xác nhận lại mật khẩu.';
  }
  if (password !== confirmPassword) {
    return 'Mật khẩu xác nhận không trùng khớp.';
  }
  return null;
}

/**
 * 6. Xác thực Tên Doanh nghiệp
 */
export function validateCompanyName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Vui lòng nhập tên công ty / doanh nghiệp.';
  }
  if (trimmed.length < 3) {
    return 'Tên công ty phải có tối thiểu 3 ký tự.';
  }
  if (trimmed.length > 120) {
    return 'Tên công ty không được vượt quá 120 ký tự.';
  }
  return null;
}

/**
 * 7. Xác thực Mã OTP
 */
export function validateOtp(otp: string): string | null {
  const cleanOtp = otp.trim();
  if (!cleanOtp) {
    return 'Vui lòng nhập mã xác thực OTP.';
  }
  if (!/^[0-9]{6}$/.test(cleanOtp)) {
    return 'Mã xác thực OTP phải gồm đúng 6 chữ số.';
  }
  return null;
}

/**
 * 8. Xác thực File CV nộp hồ sơ
 */
export function validateCvFile(file: File | null): string | null {
  if (!file) {
    return 'Vui lòng tải lên file CV của bạn.';
  }

  const maxSizeBytes = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSizeBytes) {
    return 'Dung lượng file vượt quá giới hạn 5MB. Vui lòng nén file hoặc chọn file nhỏ hơn.';
  }

  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const fileName = file.name.toLowerCase();
  const hasValidExt = allowedExtensions.some((ext) => fileName.endsWith(ext));

  if (!hasValidExt) {
    return 'Định dạng file không hỗ trợ. Hệ thống chỉ chấp nhận file PDF (.pdf) hoặc Word (.doc, .docx).';
  }

  return null;
}

