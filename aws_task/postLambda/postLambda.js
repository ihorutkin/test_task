const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const id = uuid.v4();
  if(!event.age || !event.first_name){
    return {
      statusCode:400,
      body: "User name or age was not provided"
    }
    
  }

  const params = {
    TableName: 'users',
    Item: {
      user_id: id,
      first_name: event.first_name,
      age: event.age
    }
  };

  const resp = await dynamodb.put(params).promise();
  
  console.log(resp);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      user_id: id
    })
  };

  return response;
};