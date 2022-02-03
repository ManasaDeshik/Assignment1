// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  baseUrl: window['localUrl'],
   //ws_url : 'http://stage-alb-1638965854.ap-south-1.elb.amazonaws.com',
    //newBaseUrl : 'http://qa-ecs-elb-578027789.ap-south-1.elb.amazonaws.com/',
  // newBaseUrl : 'http://localhost:3002/',
  //ws_url : 'http://newqa-alb-11561857.ap-south-1.elb.amazonaws.com',
  //newBaseUrl : 'http://newqa-alb-11561857.ap-south-1.elb.amazonaws.com/',
  ws_url : 'http://newqa-alb-11561857.ap-south-1.elb.amazonaws.com',
  newBaseUrl : 'http://newqa-alb-11561857.ap-south-1.elb.amazonaws.com/',
  newGoogleAPIUrl: 'https://inputtools.google.com/',
  //newBaseUrl : 'http://stage-alb-1638965854.ap-south-1.elb.amazonaws.com/',
  environment : 'staging',
  oldBaseUrl : 'https://staging.frontiermkts.in/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
