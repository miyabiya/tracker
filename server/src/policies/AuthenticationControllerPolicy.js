const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }

        const {error} = Joi.validate(req.body, schema)
        
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                    error: '正しいメールアドレスを入力してください'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `パスワードが正しくありません。以下の条件が考えられます
                                <br>
                                1.大文字または小文字の英字と数字が含まれていない
                                <br>
                                2.8文字～32文字ではない
                            `
                    })
                    break
                default:
                    res.status(400).send({
                        error: '登録に失敗しました'
                    })
            }
        } else {
           next()
        }
    }
}
