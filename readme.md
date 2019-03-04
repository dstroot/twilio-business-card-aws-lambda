## Blog Post

I wrote a post about this repo [here](https://danstroot.com/2019/03/02/digital-business-card/). Feel free to fork this repo and make your own digital business card.

My *.vcf files are hosted in an S3 bucket. I included them here for reference.

### Reference Links

The biggest challenge was forcing AWS to send XML and stop telling Twilio it was JSON.

https://github.com/serverless/examples/edit/master/aws-node-twilio-send-text-message/serverless.yml
https://appdividend.com/2019/01/12/aws-lambda-and-node-js-tutorial-getting-started-with-serverless/
https://docs.aws.amazon.com/lambda/latest/dg/programming-model.html
https://stackoverflow.com/questions/43829577/unable-to-send-xml-response-with-serverless-framework
https://github.com/serverless/serverless/issues/3568

### Commands

test:

```js
serverless invoke local -f twilio -p data.json
```

deploy:

```js
serverless deploy
```
