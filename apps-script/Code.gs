/**
 * サバイブ 防災備蓄・無料チェック受付
 * このスクリプトは、申込台帳に紐づけた Google スプレッドシートで使います。
 */
const SHEET_NAME = '無料チェック申込';
const NOTIFY_EMAIL = 'speakup.co.jp@gmail.com';

function doGet() {
  return response_('受付システムは稼働中です。');
}

function doPost(e) {
  const data = e && e.parameter ? e.parameter : {};
  if (data._honey) return response_('ok');

  const lead = {
    name: clean_(data.name),
    area: clean_(data.area),
    email: clean_(data.email),
    phone: clean_(data.phone),
    preferredTime: clean_(data.preferred_time),
    details: clean_(data.details),
    diagnosis: clean_(data['無料チェック結果']),
    source: clean_(data['流入元'])
  };
  if (!lead.name || !lead.area || (!lead.email && !lead.phone)) return response_('invalid');
  if (lead.email && !isEmail_(lead.email)) return response_('invalid');
  if (lead.phone && !isPhone_(lead.phone)) return response_('invalid');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (!claimSubmissionSlot_()) return response_('too_many_requests');
    const sheet = getSheet_();
    sheet.appendRow([
      new Date(), '新規', sheetValue_(lead.name), sheetValue_(lead.area), sheetValue_(lead.email), sheetValue_(lead.phone),
      sheetValue_(lead.preferredTime), sheetValue_(lead.details), sheetValue_(lead.diagnosis), sheetValue_(lead.source)
    ]);
    const message = {
      to: NOTIFY_EMAIL,
      subject: `【要対応】防災備蓄・無料チェック申込：${lead.name}様（${lead.area}）`,
      body: mailBody_(lead)
    };
    if (lead.email) message.replyTo = lead.email;
    MailApp.sendEmail(message);
  } finally {
    lock.releaseLock();
  }
  return response_('ok');
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['受付日時', '対応状況', 'お名前', '地域', 'メール', '電話', '希望日時', '確認したいこと', '無料チェック結果', '流入元']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean_(value) {
  return String(value || '').trim().slice(0, 2000);
}

function sheetValue_(value) {
  const text = clean_(value);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function isEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone_(value) {
  return /^[0-9+()\-\s]{6,32}$/.test(value);
}

function claimSubmissionSlot_() {
  const cache = CacheService.getScriptCache();
  const key = `lead-slot-${Math.floor(Date.now() / 60000)}`;
  const count = Number(cache.get(key) || '0');
  if (count >= 20) return false;
  cache.put(key, String(count + 1), 120);
  return true;
}

function mailBody_(lead) {
  return [
    '防災備蓄・無料チェックの新規申込です。', '',
    `お名前：${lead.name}`, `地域：${lead.area}`, `メール：${lead.email}`,
    `電話：${lead.phone || '未入力'}`, `希望日時：${lead.preferredTime}`,
    `確認したいこと：${lead.details || '未入力'}`, '',
    `無料チェック結果：${lead.diagnosis || '未入力'}`,
    `流入元：${lead.source || '未入力'}`, '',
    '対応後は、スプレッドシートの「対応状況」を更新してください。'
  ].join('\n');
}

function response_(text) {
  return HtmlService.createHtmlOutput(text).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
