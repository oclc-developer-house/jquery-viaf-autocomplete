jquery-viaf-autocomplete
========================
### Goals

To provide an easy way to obtain the VIAF ID of an input entity through use of the VIAF endpoint.  

There are presently two widgets in this project:
  * jquery.viaf.autocomplete.js , which uses, but does not extend, jquery.ui.autocomplete
  * jquery.viafauto.js , which is an extension of jquery.ui.autocomplete

Currently, the widgets are using the OCLC VIAF AutoSuggest API endpoint, but we may switch to using the VIAF Search endpoint as that develops into better support for json. 
  __


### Usage

1. Download and include   src/jquery.viaf.autocomplete.js 

   This widget requires at least jQuery 1.6.1, and jQuery UI 1.8
   See the sample implementation in testwidget.html

2. Download and include src/jquery.viafauto.js

   See the sample implementation in testwidget2.html 




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

#### Sample Viaf Links

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

<!--

### Goals

As a metadata editor I want a way to easily identify an entity so that I don’t have to manually add data.

As an integrator I want modular so that it is easy to install.

### Endpoint Extensions
Long term, we'd like the search endpoint to be able to provide JSONP like autosuggest does:

```
GET http://viaf.org/viaf/search?query=local.names+all%22Neal%20Stephenson%22&callback=myFunction
Accept: application/json (or text/javascript)
```

like: 

```javascript
myFunction({
  "version": "1.1",
  "numberOfRecords": 6,
  "resultSetIdleTime": 1,
  "records": [
    { "recordSchema": "default", "recordPacking": "xml", "recordData": {...}},
    { "recordSchema": "default", "recordPacking": "xml", "recordData": {...}},
     ...
   ]
})
```

But that will involve the non-trivial conversion of SRU XML to JSON.  

Short term, we could get by with an additional field in the response from autosuggest:

```
GET http://viaf.org/viaf/AutoSuggest?query=raymond james
```

```javascript
myFunction({ 
  "query":"raymond james",
  "result":[
  {"term":"Raymond James Sontag, 1897-1972",
   "type": "Personal",
   "lc":"n85005527",    "dnb":"12708603x",
   "bne":"xx1143756",   "nla":"000035512726",
   "viafid":"42849305"},
  {"term":"Raymond James Long, 1938-",
   "type": "Personal",
   "lc":"n81079333",    "dnb":"123240638",
   "bav":"adv10021126", "bnf":"12935138",
   "viafid":"27197164"}
  ...
})
```

The "type" value should correspond to: *records > record > recordData > VIAFCluster > nameType* from the existing SRU response.  

Then the obvious next step would be to allow a query parameter to filter by the newly exposed field.  The motivation is that when you know you are looking for a geographic or corporate name or UniformTitleWork, the relevance of the most likely auto-complete entries will be zero.  In those cases, the user is quite likely to get back only the "wrong" completions until much later in the string and it is conceivable that even the complete string will still retrieve more than one page of hits of the wrong type.  

-->
