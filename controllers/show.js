const errorHandler = require('../helpers')

const showController = {

	getShows: (req, res) => {
		try {
			const matches = req.body?.payload.filter(obj => obj?.drm === true && obj?.episodeCount > 0) || []
			if (matches.length === 0) {
				throw Error("No valid show")
			} else {
				const results = matches.map(obj => {
					const { image: { showImage = null }, slug, title } = obj
					return { image: showImage, slug, title }
				})
				return res.status(200).send({ response: results })
			}
		} catch (e) {
			errorHandler(e, res)
		}
	}
};

module.exports = showController;

