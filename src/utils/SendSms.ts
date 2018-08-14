import request from 'request';

const headers = {
  'User-Agent':       'Super Agent/0.0.1',
  'Content-Type':     'application/x-www-form-urlencoded'
}

// 요청 세부 내용
const options = {
  url: process.env.SMS_URL,
  method: 'GET',
  headers: headers,
  qs: {'job_id': '1', 'mtel_no': '', 'msg' : '', 'rtel_no' : '16440088'}
}

export const sendSms = (to: string, msg : string) => {
  options.qs.mtel_no = to;
  options.qs.msg = msg;
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
    }
  })
};


export const sendVerificationSMS = (to: string, key: string) =>
  sendSms(to, `Your verification is: ${key}`);