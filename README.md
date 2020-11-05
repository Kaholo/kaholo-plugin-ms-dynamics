# kaholo-plugin-ms-dynamics
Microsoft Dynamics plugin for Kaholo

## Settings

* Authority URL - The authority URL to authenticate with. (Default: https://login.microsoftonline.com/common/oauth2/nativeclient)
* Client ID - The client ID of the app registered to AD.
* Username - The username to authenticate
* Password - The user password
* Resource - The dynamics resouece (i.e. https://xxx.crm.dynamics.com)


## Method: Export Solution

**Description:**

Exports a solution to a zip file. 

You can see further information on [ExportSolution documentation](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/exportsolution?view=dynamics-ce-odata-9).

**Parameters:**

* Output Path - The zip output path.
* Solution Name - The unique name of the solution.
* Managed - Indicates whether the solution should be exported as a managed solution.
* Export Auto Numbering - Indicates whether auto numbering settings should be included in the solution being exported.
* Export Calendar - Indicates whether calendar settings should be included in the solution being exported
* Export Customization - Indicates whether customization settings should be included in the solution being exported.
* Export Email Tracking - Indicates whether email tracking settings should be included in the solution being exported.
* Export General - Indicates whether general settings should be included in the solution being exported.
* Export Marketing - Indicates whether marketing settings should be included in the solution being exported.
* Export Outlook Synchronization - Indicates whether outlook synchronization settings should be included in the solution being exported.
* Export Relationship Roles - Indicates whether relationship role settings should be included in the solution being exported.
* Export ISV Config - Indicates whether ISV.Config settings should be included in the solution being exported.
* Export Sales - Indicates whether sales settings should be included in the solution being exported.
* Export External Applications - Indicates whether external applications should be included in the solution being exported.


## Method: Import Solution

**Description:**

Imports a solution from an export zip file. 

You can see further information on [ImportSolution documentation](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/importsolution?view=dynamics-ce-odata-9).

**Parameters:**

* ZIP Path - The path to the zip file
* importJobId - The ID of the import job that will be created to perform the import. (Default: auto generated v4 UUID)
* Overwrite Unmanaged Customizations - Indicates whether any unmanaged customizations that have been applied over existing managed solution components should be overwritten
* Publish Workflows - Indicates whether any processes (workflows) included in the solution should be activated after they are imported.
* Convert To Managed - Converts any matching unmanaged customizations into your managed solution.
* Skip Product Update Dependencies - Indicates whether enforcement of dependencies related to product updates should be skipped.
* Holding Solution
* Skip Queue Ribbon Job
* Async Ribbon Processing