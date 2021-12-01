

const showController = {

	getShows: (req, res) => {
		const matches = req.body?.payload.filter(obj => obj?.drm === true && obj?.episodeCount > 0) || []
		if (matches.length === 0) {
			return res.status(400).send({
				error: "Could not decode request: JSON parsing failed"
			})
		} else {
			const results = matches.map(obj => {
				const { image: { showImage = null }, slug, title } = obj
				return { image: showImage, slug, title }
			})
			return res.status(200).send({ response: results })
		}
	}

};

module.exports = showController;