import Lambda from 'aws-sdk/clients/lambda';

const lambda = new Lambda({region: process.env.AWS_REGION});
export const proxy = async (event: any) => {
  const lambdaFunction = async () => {
    await lambda
      .invoke({
        FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME!.replace(
          /-proxy$/,
          '-app'
        ),
        InvocationType: 'Event',
        Payload: JSON.stringify(event),
      })
      .promise();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body:
        '<!doctype><html><body><script>close()</script><p>Please close this page</p></body></html>',
    };
  };
  return lambdaFunction();
};
