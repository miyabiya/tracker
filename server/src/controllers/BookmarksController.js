const {
    Bookmark,
    Song
} = require('../models/')
const _ = require('lodash')

module.exports = {
    async index (req, res) {
        try {
            const userId = req.user.id
            const {songId} = req.query
            const where = {
                UserId: userId
            }
            if (songId) {
                where.SongId = songId
            }
            const bookmarks = await Bookmark.findAll({
                where: where,
                include: [{
                    model: Song
                }]
            }).map(bookmark => bookmark.toJSON())
              .map(bookmark => _.extend(
                {},
                bookmark.Song,
                bookmark
              ))
            console.log(bookmarks[0])
            res.send(bookmarks)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the songs.'
            })
        }
    },
    async post (req, res) {
        console.log('req start')
        try {
            const userId = req.user.id
            const {songId} = req.body.params
            console.log(req.body.params)
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            console.log('bookmark exists', !!bookmark)
            if (bookmark) {
                return res.status(400).send({
                    error: 'このブックマークはすでに登録されています'
                })
            }
            const newBookmark = await Bookmark.create({
                SongId: songId,
                UserId: userId
            })
            res.send(newBookmark)
        } catch (err) {
            res.status(500).send({
                error: 'このブックマークは許可されていません'
            })
        }
    },
    async delete (req, res) {
        try {
            console.log('delete req start', req.params)
            const userId = req.user.id
            const {bookmarkId} = req.params
            console.log('get params', bookmarkId)
            const bookmark = await Bookmark.findOne({
                where: {
                    id: bookmarkId,
                    UserId: userId
                }
            })
            if (!bookmark) {
                return res.status(403).send({
                  error: 'ブックマークの削除ができませんでした'
                })
              }
            console.log('delete data is ', bookmark)
            await bookmark.destroy()
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'ブックマークの削除ができませんでした'
            })
        }
    }
}
