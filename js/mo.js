/***********************************************************
* Licensed Materials - Property of IBM
*
* 5724-U18	
*
* (C) Copyright IBM Corp. 2015  All Rights Reserved.
*
* US Government Users Restricted Rights - Use, duplication, or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
***********************************************************/

function createMaximoObjectInfo() {

	var sizeObjects = obj.length;

    var objectInfo = ''; 
	
		objectInfo += '<h2>'
		objectInfo += addAnchoredTagForObject(obj.objectName);
		objectInfo += '</h2>'
		
		objectInfo += '<h4>'
		objectInfo +=  addMaximoObjectDescriptionInfo(obj.description);
		objectInfo += '</h4>'
		if (obj.longDescription != null) {
			objectInfo +=  addMaximoObjectDescriptionInfo(obj.longDescription);
		}
		
		objectInfo += '<h4>'
		if (obj.isView == true) {
			objectInfo +=  addMaximoObjectDescriptionInfo('View');
		} else {
			if (obj.isPersistent == true) {
				objectInfo +=  addMaximoObjectDescriptionInfo('Table');
			} else {
				objectInfo +=  addMaximoObjectDescriptionInfo('Nonpersistent object');
			}
		}
	
		
		if (obj.isMainObject == true) {
			objectInfo +=  addMaximoObjectDescriptionInfo('Main object');
		}
					
		objectInfo += '</h4>'
		
		objectInfo +=  addMaximoObjectDescriptionInfo(obj.className);
		
		
		if (obj.isView == false){
			objectInfo +=  addMaximoObjectInfo('UniqueID',  obj.uniqueId);
		}
		
		if (obj.isInternal == true) {
			objectInfo +=  addMaximoObjectDescriptionInfo('Internal object');
		} 
		
		if (obj.isView == false){
			if (obj.primaryKeyColumns.length > 0) {
				var arrayKeys = obj.primaryKeyColumns;
				objectInfo +=  addMaximoObjectPrimaryColumnsKeyInfo(arrayKeys);
			} 			
		} 		
		
		objectInfo +=  '<BR>'
     	objectInfo +=  '<BR>'
       
   
	document.getElementById('MaximoObjectsInfo').innerHTML = objectInfo;

}

function createViewInfo() {
	
	var viewInfo = ''; 
	
	if (obj.isView == true) {
		if (obj.viewinfo.autosect == true) {
			viewInfo += '<h4>';
			viewInfo += 'Autoselect view';
			viewInfo += '</h4>';
		} else {
			viewInfo += '<h4>Viewselect:</h4>';
			viewInfo +=  addMaximoObjectDescriptionInfo(obj.viewinfo.viewselect);
			
			viewInfo += '<h4>Viewfrom:</h4>';
			viewInfo +=  addMaximoObjectDescriptionInfo(obj.viewinfo.viewfrom);			
			
		}
		
		viewInfo += '<h4>Viewwhere:</h4>';
		viewInfo +=  addMaximoObjectInfo(obj.viewinfo.viewwhere);
	
		viewInfo +=  '<BR>'
	} 
	
	document.getElementById('ViewInfo').innerHTML = viewInfo;

}


function createLogicalRelationshipInfo() {
	
	objectLogRelInfo =  '';
	var logicalRel = obj.logicalRelationships;
	var targetLogicalRel = obj.targetLogicalRelationships;
	
	
	//Check if there is any valid logical relationship
	var validateLogRel = false;
    for (var i = 0; i < logicalRel.length; i++) {
    	if ((logicalRel[i].status == "UNVERIFIED") || (logicalRel[i].status == "VERIFIED")){
     		validateLogRel = true;
    	}
    	
    }
	
	
	//Check if there is any valid target relationship
	var validateTargetRel = false;
    for (var i = 0; i <  targetLogicalRel.length; i++) {
    	if ((targetLogicalRel[i].status == "UNVERIFIED") || (targetLogicalRel[i].status == "VERIFIED")){
     		validateTargetRel = true;
    	}
    	
    }
	
	
	if ((logicalRel != null) && (targetLogicalRel != null)) {
		if  (((logicalRel.length > 0) || (targetLogicalRel.length > 0)) && ((validateLogRel == true) || (validateTargetRel == true))) {
			objectLogRelInfo +=  '<h3>     LOGICAL RELATIONSHIPS </h3>';
		} else {
			objectLogRelInfo +=  '<h3>  NO  LOGICAL RELATIONSHIPS  </h3>';
		}
		
	}
	
	
	if (logicalRel != null){
		if  ((logicalRel.length > 0) && (validateLogRel == true)) {
			var titleParent = "FOREIGN KEYS INTO " + obj.objectName + ""; 
			objectLogRelInfo += addLogicalRelationshipInfo(logicalRel, titleParent);
		}
	}

	if (targetLogicalRel != null){
		if  ((targetLogicalRel.length > 0) && (validateTargetRel == true)) {
			var titleChild = obj.objectName + " FOREIGN KEYS";			
			objectLogRelInfo += addLogicalRelationshipInfo(targetLogicalRel, titleChild);
		}
	}

	document.getElementById('MaximoLogicalRelationshipsInfo').innerHTML = objectLogRelInfo;
	
}


function addLogicalRelationshipInfo(logRel, title) {
	
	//OBJECTNAME PARENTKEYS  TARGETOBJ TARGETKEYS  RELNUM  DESCRIPTION
	
	var text = '';
	text += '<h4> ';
	text += title;
	text += '</h4> ';
	var theader = '<table border="1" cellpadding="1" cellspacing="1">';
	var header = '';
	header += '<thead>';
	header += '<tr>';
	header +=  '<th scope="col">Object(Parent Keys)</th>';
	header +=  '<th scope="col">Target Object(Target Keys)</th>';
	header +=  '<th scope="col">Rel Number</th>';
	header +=  '<th scope="col">Description</th>';
	header += '</tr>';
	header += '</thead>';
	
		
	var tbody = '';
	//counter = 0;
    for (var i = 0; i < logRel.length; i++) {
    	//status (unverified|verified|invalidated) 
        if ((logRel[i].status == "UNVERIFIED") || (logRel[i].status == "VERIFIED")){
        	
        	var italic;
        	var italicEnd;
        	if (logRel[i].status == "VERIFIED"){
        		italic = '';       
         		italicEnd = '';       		       	
        	} else {  // means UNVERIFIED
        		italic = '<i>';
        		italicEnd = '</i>';                 	
        	}        	
        
        	tbody += '<tr>';
        	tbody += '<td>';
        	tbody += italic;
        	tbody += addAnchorForRelatioshipObject(logRel[i].objectName);
	    	tbody += '(';
	    	tbody +=  logRel[i].parentKeys;
	    	tbody += ')';
	    	tbody += italicEnd;
			tbody += '</td>';
	    	tbody += '<td>';
	    	tbody += italic;
        	tbody += addAnchorForRelatioshipObject(logRel[i].targetObject);
	  		tbody += '(';
        	tbody +=  logRel[i].targetKeys;
	    	tbody += ')';
	    	tbody += italicEnd;
	    	tbody += '</td>';
			tbody += '<td>';
			tbody += italic;
        	tbody +=  logRel[i].relNum;
        	tbody += italicEnd;
	    	tbody += '</td>';
	    	tbody += '<td>';
	    	tbody += italic;
	    	if (logRel[i].longDescription != null) {
	    	   	tbody += '<b>';
	    	}
        	tbody +=  logRel[i].description;
        	if (logRel[i].longDescription != null) {
       			tbody += '</b>';
       		}
    		if (logRel[i].longDescription != null) {
    			 tbody +=  '<BR>'
				 tbody +=  logRel[i].longDescription;
			}
	   		tbody += italicEnd;
	    	tbody += '</td>';
	   		tbody += '</tr>\n';
    		//counter = counter + 1;
    	}
    }
	//var tfooter = '</table></div>';
	var tfooter = '</table>';
	
	//if (counter > 0) {
		text = text + theader + header + tbody + tfooter;
	//} else {
	//	text = '';
	//}	
	
	return text;
}


function createColumnsInfo() {
	
	objectInfo =  '';
	var columns = obj.columns;
	if (obj.isView == false){
		objectInfo +=  addColumnsInfo(columns);
	} else {
		objectInfo +=  addColumnsViewInfo(columns);
	}
	document.getElementById('MaximoObjectsColumnsInfo').innerHTML = objectInfo;
	
}


function addMaximoViewColumnsInfo(viewColumns) {
	var text = '';
	text += '<h3> View columns: </h3>'
	var theader = '<table border="1" cellpadding="1" cellspacing="1">';
	var header = '';
	header += '<thead>';
	header += '<tr>';
	header +=  '<th scope="col">View Column Name</th>';
	header +=  '<th scope="col">Table Name</th>';
	header +=  '<th scope="col">Table Column Name</th>';
	header += '</tr>';
	header += '</thead>';
	
		
	var tbody = '';
    for (var i = 0; i < viewColumns.length; i++) {
        tbody += '<tr>';
        tbody += '<td>';
        tbody += viewColumns[i].viewColumnName;
	    tbody += '</td>';
		tbody += '<td>';
        tbody += viewColumns[i].tableName;
	    tbody += '</td>';
		tbody += '<td>';
        tbody += viewColumns[i].tableColumnName;
	    tbody += '</td>';
		tbody += '</tr>\n';
    }
	//var tfooter = '</table></div>';
	var tfooter = '</table>';
	
	text = text + theader + header + tbody + tfooter;
	
	return text;
}

function addColumnsInfo(columns) {
	var text = '';
	text += '<h3> COLUMNS</h3>'
	var theader = '<table border="1" cellpadding="1" cellspacing="1">';
	var header = '';
	header += '<thead>';
	header += '<tr>';
	header +=  '<th scope="col">Attribute</th>';
	header +=  '<th scope="col">Modifier</th>';
	header +=  '<th scope="col">Title</th>';
	header +=  '<th scope="col">Remarks</th>';
	header +=  '<th scope="col">SameAsAttrib</th>';
	header +=  '<th scope="col">SameAsObject</th>';
	header += '</tr>';
	header += '</thead>';
	
		
	var tbody = '';
    for (var i = 0; i < columns.length; i++) {
        tbody += '<tr>';
        tbody += '<td>';
        tbody += columns[i].attributeName;
	    tbody += '</td>';
		tbody += '<td>';
        tbody +=  modifierValue(columns[i].required , columns[i].persistent);
	    tbody += '</td>';
		tbody += '<td>';
        tbody += columns[i].title;
	    tbody += '</td>';
		tbody += '<td>';
        tbody +=  columns[i].remarks;
	    tbody += '</td>';
	    tbody += '<td>';
        tbody +=  displayNonNull(columns[i].sameAsAttribute);
	    tbody += '</td>';
	    tbody += '<td>';
        tbody +=  displayNonNullAnchor(columns[i].sameAsObject);
	    tbody += '</td>';
    	tbody += '</tr>\n';
    }
	//var tfooter = '</table></div>';
	var tfooter = '</table>';
	
	text = text + theader + header + tbody + tfooter;
	
	return text;
}


function displayNonNull(value){
	var text = '';
	if (value != null){
		text +=  value;
	}
	return text;
}

function displayNonNullAnchor(value){
	var text = '';
	if (value != null){
		text += addAnchorForRelatioshipObject(value);
	}
	return text;
}


function modifierValue(required, persistent){
	var text = '';
	if ((required == true) && (persistent == true)) {
		text +=  'Required';
	} else if ((required == false) && (persistent == false)) {
		text +=  'Nonperistent';
	} else if ((required == true) && (persistent == false)) {
		text +=  'Required';
		text +=  '<br>';
		text +=  'Nonperistent';
	} 
	return text;
}


function addColumnsViewInfo(columns) {
	var text = '';
	text += '<h3> Columns</h3>'
	var theader = '<table border="1" cellpadding="1" cellspacing="1">';
	var header = '';
	header += '<thead>';
	header += '<tr>';
	header +=  '<th scope="col">View Column Name</th>';
	header +=  '<th scope="col">Table Name</th>';
	header +=  '<th scope="col">Table Column Name</th>';
	header +=  '<th scope="col">Modifier</th>';
	header +=  '<th scope="col">Title</th>';
	header +=  '<th scope="col">Remarks</th>';
	header +=  '<th scope="col">SameAsAttrib</th>';
	header +=  '<th scope="col">SameAsObject</th>';
	header += '</tr>';
	header += '</thead>';
	
			
	var tbody = '';
    for (var i = 0; i < columns.length; i++) {
        tbody += '<tr>';
        tbody += '<td>';
        tbody += columns[i].attributeName;
	    tbody += '</td>';
		tbody += '<td>';
		if (columns[i].persistent == true) {
			tbody += displayNonNullAnchor(columns[i].tableName);
		} else {
			tbody += '';	
		}
	    tbody += '</td>';
		tbody += '<td>';
		if (columns[i].persistent == true) {
			tbody += columns[i].tableColumnName;
		} else {
			tbody += '';	
		}
	    tbody += '</td>';
		tbody += '<td>';
        tbody +=  modifierValue(columns[i].required , columns[i].persistent);
	    tbody += '</td>';
		tbody += '<td>';
        tbody += columns[i].title;
	    tbody += '</td>';
		tbody += '<td>';
        tbody +=  columns[i].remarks;
	    tbody += '</td>';
	    tbody += '<td>';
        tbody +=  displayNonNull(columns[i].sameAsAttribute);
	    tbody += '</td>';
	    tbody += '<td>';
        tbody +=  displayNonNullAnchor(columns[i].sameAsObject);
	    tbody += '</td>';
    	tbody += '</tr>\n';
    }
	//var tfooter = '</table></div>';
	var tfooter = '</table>';
	
	text = text + theader + header + tbody + tfooter;
	
	return text;
}

function createRelationshipsInfo() {
	
	objectInfo =  '';
	
	if ((obj.outgoingRelationships.length > 0) || (obj.incomingRelationships.length > 0)) {
			objectInfo +=  '<h3> MAXIMO RELATIONSHIPS </h3>';
	}
	
	if (obj.outgoingRelationships.length > 0) {
		var outgoingRel = obj.outgoingRelationships;
		objectInfo +=  outgoingRelationships(outgoingRel);
	}
		
	if (obj.incomingRelationships.length > 0) {
		var incomingRel = obj.incomingRelationships;
		objectInfo +=  incomingRelationships(incomingRel);
	}
	
	document.getElementById('MaximoRelationshipsInfo').innerHTML = objectInfo;
	
}


function outgoingRelationships(outgoingRel) {
	var text = '';
	text += '<h4> MAXIMO OUTGOING RELATIONSHIPS</h4>'
	var theader = '<table border="1" cellpadding="1" cellspacing="1">';
	var header = '';
	header += '<thead>';
	header += '<tr>';
	header +=  '<th scope="col">Name</th>';
	header +=  '<th scope="col">Target</th>';
	header +=  '<th scope="col">Remarks</th>';
	header +=  '<th scope="col">Where Clause</th>';
	header +=  '<th scope="col">Cardinality</th>';
	header += '</tr>';
	header += '</thead>';
		var tbody = '';
    for (var i = 0; i < outgoingRel.length; i++) {
        tbody += '<tr>';
        tbody += '<td>';
        tbody += outgoingRel[i].name;
	    tbody += '</td>';
		tbody += '<td>';
      	tbody += addAnchorForRelatioshipObject(outgoingRel[i].target);
	    tbody += '</td>';
		tbody += '<td>';
		tbody +=  outgoingRel[i].remarks;
	    tbody += '</td>';
		tbody += '<td>';
 		tbody += outgoingRel[i].whereClause;
	    tbody += '</td>';
		tbody += '<td>';
        tbody += outgoingRel[i].cardinality;
	    tbody += '</td>';
    	tbody += '</tr>\n';
    }
	//var tfooter = '</table></div>';
	var tfooter = '</table>';
	
	text = text + theader + header + tbody + tfooter;
	
	return text;
}


function incomingRelationships(incomingRel) {
	var text = '';
	text += '<h4> MAXIMO INCOMING RELATIONSHIPS</h4>'
	
	var theader = '<table border="1" cellpadding="1" cellspacing="1">';
	var header = '';
	header += '<thead>';
	header += '<tr>';
	header +=  '<th scope="col">Name</th>';
	header +=  '<th scope="col">Source</th>';
	header +=  '<th scope="col">Remarks</th>';
	header +=  '<th scope="col">Where Clause</th>';
	header +=  '<th scope="col">Cardinality</th>';
	header += '</tr>';
	header += '</thead>';
		var tbody = '';
    for (var i = 0; i < incomingRel.length; i++) {
        tbody += '<tr>';
        tbody += '<td>';
        tbody += incomingRel[i].name;
	    tbody += '</td>';
		tbody += '<td>';
     	tbody += addAnchorForRelatioshipObject(incomingRel[i].source);
	    tbody += '</td>';
		tbody += '<td>';
		tbody +=  incomingRel[i].remarks;
	    tbody += '</td>';
		tbody += '<td>';
 		tbody += incomingRel[i].whereClause;
	    tbody += '</td>';
		tbody += '<td>';
        tbody += incomingRel[i].cardinality;
	    tbody += '</td>';
    	tbody += '</tr>\n';
    }
	//var tfooter = '</table></div>';
	var tfooter = '</table>';
	
	text = text + theader + header + tbody + tfooter;
	
	return text;
}

function addMaximoObjectPrimaryColumnsKeyInfo(arrayKeys) {
	var text = '';
	text += 'Primary key: '
	for	(index = 0; index < (arrayKeys.length - 1); index++) {
		text += arrayKeys[index];
		text += " + ";
	}
	text += arrayKeys[arrayKeys.length - 1];
	return text;
}


function addAnchoredTagForObject(objectName) {
	var anchorInfo = '';
	anchorInfo += '<a name="'
	anchorInfo += objectName
	anchorInfo += '">'
	anchorInfo += objectName
	anchorInfo += '</a>'
	return anchorInfo;
}

function addMaximoObjectInfo(name, value){
	var objContainer ='';
	objContainer += '<p>'
	objContainer += name;
	objContainer += ": "
	objContainer += value;
	objContainer += '</p>'
	return objContainer;
}

function addMaximoObjectDescriptionInfo(object){
	var objContainer ='';
	objContainer += '<p>'
	objContainer += object;
	objContainer += '</p>'
	return objContainer;
}

function addAnchorForRelatioshipObject(objectName) {
	var anchorInfo = '';
	anchorInfo += '<a href="../../objects/'
	anchorInfo += objectName
	anchorInfo += '/'
	anchorInfo += objectName
	anchorInfo += '.html'
	anchorInfo += '">'
	anchorInfo += objectName
	anchorInfo += '</a>'
	return anchorInfo;
}
