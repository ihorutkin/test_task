const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const user_id = event.pathParameters.user_id;

  const params = {
    TableName: 'users',
    KeyConditionExpression: 'user_id = :id',
    ExpressionAttributeValues: {
      ':id': user_id
    }
  };

  try {
    const data = await dynamodb.query(params).promise();
    const user = data.Items[0];

    if (!user) {
      return {
        statusCode: 404,
        body:"Can't find user with provided "
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body:JSON.stringify(error)
    };
  }
};
