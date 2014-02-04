jquery-viaf-autocomplete
========================

### VIAF Documentation

OCLC VIAF API Documentation: http://oclc.org/developer/services/viaf

Using the API: http://oclc.org/developer/documentation/virtual-international-authority-file-viaf/using-api

Request Types: http://oclc.org/developer/documentation/virtual-international-authority-file-viaf/request-types

Response Details: http://oclc.org/developer/documentation/virtual-international-authority-file-viaf/response-details

SRU Explain page: http://www.viaf.org/viaf/search

### jQuery links

jQuery VIAF autocomplete backed by viaf.org

Extends Autocomplete Widget:  http://api.jqueryui.com/autocomplete/

Requires jQuery version .... 

### Example

#### Sample Links

<table>
<tr>
<td>Callback</td>
<td>http://viaf.org/viaf/AutoSuggest?query=james&callback=myCallBack</td>
</tr>
<tr>
<td>Wildcard (only at end)</td>
<td>http://viaf.org/viaf/AutoSuggest?query=jam%25&callback=samplecallback</td>
</tr>
<tr>
<td>Name Only</td>
<td>http://www.viaf.org/viaf/search?query=local.personalNames+%3D+%22james%22&recordSchema=http://viaf.org%2FVIAFCluster&maximumRecords=100&startRecord=1&resultSetTTL=300&recordPacking=xml&recordXPath=&sortKeys=</td>
</tr>
</table>


### Goals

As a metadata editor I want a way to easily identify an entity so that I don’t have to manually add data.

As an integrator i want modular so that it is easy to install.

 
