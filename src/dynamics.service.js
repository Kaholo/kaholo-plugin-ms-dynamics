const DynamicsWebApi = require("dynamics-web-api");
const AuthenticationContext = require("adal-node").AuthenticationContext;
const { writeFile, readFile } = require("fs");

class DynamicsService {
  constructor() {
    this.dynamicsWebApiClient = null;
    this.authorityUrl = null;
    this.clientId = null;
    this.username = null;
    this.password = null;
    this.resource = null;
  }

  async init({ authorityUrl, clientId, username, password, resource }) {
    //OAuth Token Endpoint
    this.authorityUrl = authorityUrl || 'https://login.microsoftonline.com/common/oauth2/nativeclient';

    //CRM Organization URL
    this.resource = resource;

    //Dynamics 365 Client Id when registered in Azure
    this.clientId = clientId;

    this.username = username;
    this.password = password;

    //create DynamicsWebApi object
    const dynamicsWebApi = new DynamicsWebApi({
      webApiUrl: `${this.resource}/api/data/v9.0/`,
      onTokenRefresh: this._onTokenRefresh(),
    });

    this.dynamicsWebApiClient = dynamicsWebApi;
  }

  _onTokenRefresh() {
    const self = this;
    return async (dynamicsWebApiCallback) => {
      var adalContext = new AuthenticationContext(self.authorityUrl);

      const token = await new Promise((resolve, reject) => {
        //call a necessary function in adal-node object to get a token
        adalContext.acquireTokenWithUsernamePassword(
          self.resource, self.username, self.password, self.clientId,
          (err, token) => {
            if (err) return reject(err);
            resolve(token);
          }
        );
      });

      dynamicsWebApiCallback(token);
    };
  }

  async exportSolution(outputPath, exportOptions) {
    const response = await this.dynamicsWebApiClient.executeUnboundAction(
      "ExportSolution",
      exportOptions
    );

    // Save zip;
    await new Promise((resolve, reject) => {
      writeFile(
        outputPath,
        Buffer.from(response.ExportSolutionFile, "base64"),
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });

    const result = {
      outputPath,
      message: `Succuessfully exported to ${outputPath}`,
    };

    return result;
  }

  async importSolution(zipPath, importOptions) {
    
    const fileData = await new Promise((resolve, reject) => {
      readFile(zipPath, { encoding: "base64" }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    importOptions.CustomizationFile = fileData;

    const result = await this.dynamicsWebApiClient.executeUnboundAction(
      "ImportSolution",
      importOptions
    );

    return {ImportJobId: importOptions.ImportJobId, status:"success" };
  }
}

module.exports = new DynamicsService();
