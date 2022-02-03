import { environment } from "./environments/environment";

let aws_config_keys = {
  development  : {
    aws_project_region: "ap-south-1",
    aws_cognito_region: "ap-south-1",
    aws_user_pools_id: "ap-south-1_FiWocZWXg",
    aws_user_pools_arn: "arn:aws:cognito-idp:ap-southeast-1:202791543801:userpool/ap-southeast-1_ix9vsrdjk",
    aws_user_pools_web_client_id: "",
    userPoolWebClientId: '3o3689rbrq6v9j9ein2hjehve9',
    oauth: {
      domain: "",
      scope: [
        "phone",
        "email",
        "openid",
        "profile",
        "aws.cognito.signin.user.admin"
      ],
      redirectSignIn: "http://localhost:4200",
      redirectSignOut: "http://localhost:4200",
      responseType: "code"
    }
  },
  qa  : {
    aws_project_region: "ap-south-1",
    aws_cognito_region: "ap-south-1",
    aws_user_pools_id: "ap-south-1_muqfkFM6H",
    aws_user_pools_arn: "arn:aws:cognito-idp:ap-south-1:202791543801:userpool/ap-south-1_muqfkFM6H",
    aws_user_pools_web_client_id: "",
    userPoolWebClientId: '7qba58g1t490u9li0plm2l22e5',
    oauth: {
      domain: "",
      scope: [
        "phone",
        "email",
        "openid",
        "profile",
        "aws.cognito.signin.user.admin"
      ],
      redirectSignIn: "http://localhost:4200",
      redirectSignOut: "http://localhost:4200",
      responseType: "code"
    }
  },
  staging  : {
    aws_project_region: "ap-south-1",
    aws_cognito_region: "ap-south-1",
    aws_user_pools_id: "ap-south-1_aPGAg4PXn",
    aws_user_pools_arn: "arn:aws:cognito-idp:ap-south-1:202791543801:userpool/ap-south-1_aPGAg4PXn",
    aws_user_pools_web_client_id: "",
    userPoolWebClientId: '49ih5c5h217jrde1l1sm24ud3v',
    oauth: {
      domain: "",
      scope: [
        "phone",
        "email",
        "openid",
        "profile",
        "aws.cognito.signin.user.admin"
      ],
      redirectSignIn: "http://localhost:4200",
      redirectSignOut: "http://localhost:4200",
      responseType: "code"
    }
  },

production  : {
  aws_project_region: "ap-south-1",
  aws_cognito_region: "ap-south-1",
  aws_user_pools_id: "ap-south-1_cQD57uWyb",
  aws_user_pools_arn: "arn:aws:cognito-idp:ap-south-1:202791543801:userpool/ap-south-1_cQD57uWyb",
  aws_user_pools_web_client_id: "",
  userPoolWebClientId: '570nj80cdtf09fjibusr0c48mu',
  oauth: {
    domain: "",
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin"
    ],
    redirectSignIn: "http://localhost:4200",
    redirectSignOut: "http://localhost:4200",
    responseType: "code"
  }
}
}


const awsconfig = aws_config_keys[environment.environment];
export default awsconfig