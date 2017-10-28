const {Bookmark} = require('../models/')

module.exports = {
    async index (req, res) {
        try {
            const {songId, userId} = req.query
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })

            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the songs.'
            })
        }
    },
    async post (req, res) {
        console.log('req start')
        try {
            const {songId, userId} = req.body.params
            console.log(req.body.params)
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            console.log('bookmark exists', !!bookmark)
            if (!!bookmark) {
                return res.status(400).send({
                    error: 'you\'re already have this set as a bookmark'
                })
            }
            const newBookmark = await Bookmark.create({
                SongId: songId,
                UserId: userId
            })
            res.send(newBookmark)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to create a bookmark.'
            })
        }
    },
    async delete (req, res) {
        try {
            console.log('req start', req.params)

            const {bookmarkId} = req.params
            console.log('get params')
            const bookmark = await Bookmark.findById(bookmarkId)
            if (!bookmark) {
                return res.status(403).send({
                  error: 'you do not have access to this bookmark'
                })
              }
            console.log('delete data is ', bookmark)
            await bookmark.destroy()
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to destroy a bookmark'
            })
        }
    }
}
