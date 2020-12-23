# RingCentral PJSIP AWS Lambda Demo

## Setup

```
cp src/credentials.sample.hpp src/credentials.hpp
```

Edit `src/credentials.hpp` and specify credentials.


## Create docker image

```
docker build -t rc-pjsip-aws-lambda-demo:latest .
```


## Local Run

```
docker run -it --rm rc-pjsip-aws-lambda-demo
```

## Create AWS ECR Repo

```
aws ecr create-repository --repository-name rc-pjsip-aws-lambda-demo --image-scanning-configuration scanOnPush=true
```

In the output message of the command above, you can find your AWS account ID, something like `1234567890.dkr.ecr.us-east-1.amazonaws.com` in which 
`1234567890` is your AWS account ID.

In the content below, we will use `1234567890` as sample/fake AWS account ID. You need to replace it with a real one.


## Tag docker image

```
docker tag rc-pjsip-aws-lambda-demo:latest 1234567890.dkr.ecr.us-east-1.amazonaws.com/rc-pjsip-aws-lambda-demo:latest
```

## Push docker image to AWS ECR

```
aws ecr get-login-password | docker login --username AWS --password-stdin 1234567890.dkr.ecr.us-east-1.amazonaws.com
docker push 1234567890.dkr.ecr.us-east-1.amazonaws.com/rc-pjsip-aws-lambda-demo:latest
```


## Deploy to AWS Lambda

Edit `serverless.yml` and specify the correct docker image hash code

```
yarn sls deploy
```


## Test it

```
curl -XPOST https://xxxxxxx.execute-api.us-east-1.amazonaws.com/prod/call
```