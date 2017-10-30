const {
    History,
    Song
} = require('../models/')

const _ = require('lodash')

module.exports = {
    async index (req, res) {
        try {
            console.log('index req', req.query)
            const userId = req.user.id
            const histories = await History.findAll({
                where: {
                    UserId: userId
                },
                include: [{
                    model: Song
                }]
            }).map(history => history.toJSON())
              .map(history => _.extend(
                {},
                history.Song,
                history
              ))
            res.send(_.uniqBy(histories, history => history.SongId))
        } catch (err) {
            res.status(500).send({
                error: '履歴のフェッチに失敗しました'
            })
        }
    },
    async post (req, res) {
        console.log('req start')
        try {
            // console.log(req.user.id)
            console.log('data ', req.body)
            const userId = req.user.id
            const {songId} = req.body
            const history = await History.create({
                SongId: songId,
                UserId: userId
            })
            console.log(history)
            res.send(history)
        } catch (err) {
            res.status(500).send({
                error: '履歴保存に失敗しました'
            })
        }
    }
}
