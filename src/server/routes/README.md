### API structure
##
##### ACCOUNT:
`POST /api/account/signin` - login \
`POST /api/account/signup` - register \
`POST /api/account/token` - refresh JWT \
`GET /api/account/me` - get account info (if JWT is not valid return an error) \
`PATCH /api/account/me` - change account info
#
##### QUESTIONS:
`GET /api/questions` - get list of questions \
`GET /api/questions/:id` - get question info with the certain id \
`POST /api/questions` - post a question
#
##### COMMENTS:
`POST /api/comments?target={target}&id={id}` - to post a comment to a target with the given id
#
##### LIKES:
`POST /api/likes?target={target}&id={id}` - like a target with the given id
#
##### STARS:
`POST /api/stars?target={target}&id={id}` - star a target with the given id