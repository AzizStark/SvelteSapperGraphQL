import express from 'express'

import authRoutes from './auth/routes'
import blogRoutes from './blog/routes'
import forumRoutes from './forum/routes'
import userRoutes from './user/routes'

let routes = express.Router()

// make sure only it is json content-type requests
routes.use('*', (req, res, next) => {
    // only json requests are accepted
    // else back to default home screen (server side render)
    if (
        req.headers.accept === 'application/json' ||
        req.headers['content-type'].indexOf('application/json') > -1
    ) {
        next()
    } else {
        res.redirect('/')
    }
})

routes.use('/auth', authRoutes)
routes.use('/blog', blogRoutes)
routes.use('/forum', forumRoutes)
routes.use('/user', userRoutes)

// default and catchall route for API
// API routes non recognized are denied
routes.all('*', (req, res) => {
  res.status(422).send()
})

export default routes
