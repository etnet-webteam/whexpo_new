declare const awsconfig: {
    aws_project_region: string;
    aws_cognito_region: string;
    aws_cognito_identity_pool_id: string;
    aws_user_pools_id: string;
    aws_user_pools_web_client_id: string;
    aws_mandatory_sign_in: string;
    aws_cloud_logic_custom: any[];
    aws_appsync_graphqlEndpoint: string;
    aws_appsync_region: string;
    aws_appsync_authenticationType: string;
};

export default awsconfig;