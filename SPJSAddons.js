		var spjs = spjs || {};
		spjs.rm = {
			"version": "2.37",
			"data": {
				"thisId": GetUrlKeyValue('ID').split(".")[0],
				"utilityVersion": 1.183,
				"isSP07": typeof _spPageContextInfo === "undefined" || _spPageContextInfo.webUIVersion === undefined,
				"isSP13": typeof _spPageContextInfo !== "undefined" && _spPageContextInfo.webUIVersion === 15 ? true : false,
				"lcidToDateFormat": {
					"1030": "d-m-y",
					"1044": "d.m.y",
					"5121": "d-m-y",
					"15361": "d/m/y",
					"3073": "d/m/y",
					"2049": "d/m/y",
					"11265": "d/m/y",
					"13313": "d/m/y",
					"12289": "d/m/y",
					"4097": "d/m/y",
					"6145": "d-m-y",
					"8193": "d/m/y",
					"16385": "d/m/y",
					"1025": "d/m/y",
					"10241": "d/m/y",
					"7169": "d-m-y",
					"14337": "d/m/y",
					"9217": "d/m/y",
					"1026": "d.m.y",
					"3076": "d/m/y",
					"5124": "d/m/y",
					"2052": "y/m/d",
					"4100": "d/m/y",
					"1028": "y/m/d",
					"1050": "d.m.y",
					"2067": "d/m/y",
					"1043": "d-m-y",
					"3081": "d/m/y",
					"10249": "d/m/y",
					"4105": "d/m/y",
					"16393": "d-m-y",
					"6153": "d/m/y",
					"8201": "d/m/y",
					"5129": "d/m/y",
					"13321": "m/d/y",
					"7177": "y/m/d",
					"11273": "d/m/y",
					"2057": "d/m/y",
					"1033": "m/d/y",
					"1080": "d-m-y",
					"1035": "d.m.y",
					"2060": "d/m/y",
					"3084": "y-m-d",
					"1036": "d/m/y",
					"5132": "d/m/y",
					"4108": "d.m.y",
					"3079": "d.m.y",
					"1031": "d.m.y",
					"5127": "d.m.y",
					"4103": "d.m.y",
					"2055": "d.m.y",
					"1038": "y.m.d",
					"1039": "d.m.y",
					"1057": "d/m/y",
					"1040": "d/m/y",
					"2064": "d.m.y",
					"1062": "y.m.d",
					"1063": "y.m.d",
					"1071": "d.m.y",
					"1086": "d/m/y",
					"2110": "d/m/y",
					"1082": "d/m/y",
					"1104": "y.m.d",
					"1045": "y-m-d",
					"1046": "d/m/y",
					"2070": "d-m-y",
					"1048": "d.m.y",
					"1049": "d.m.y",
					"1051": "d.m.y",
					"11274": "d/m/y",
					"16394": "d/m/y",
					"13322": "d-m-y",
					"9226": "d/m/y",
					"5130": "d/m/y",
					"7178": "d/m/y",
					"12298": "d/m/y",
					"17418": "d/m/y",
					"4106": "d/m/y",
					"18442": "d/m/y",
					"2058": "d/m/y",
					"19466": "d/m/y",
					"6154": "m/d/y",
					"15370": "d/m/y",
					"10250": "d/m/y",
					"20490": "d/m/y",
					"1034": "d/m/y",
					"14346": "d/m/y",
					"8202": "d/m/y",
					"1053": "y-m-d",
					"2077": "d.m.y",
					"1054": "d/m/y",
					"1055": "d.m.y"
				},
				"settingsListName": "SPJS-RM-BookableTimeRange",
				"settingsListDescription": "This list is used with SPJS Resource Management and stores the bookable time range for the various resources picked in the lists where this solution is activated.",
				"debug": GetUrlKeyValue("SPJSRMDebug") === "1"
			},
			"init": function (c) {
				if (spjs.rm.data.isSP13) {
					if ($("td.ms-formbody span[id*='" + _spPageContextInfo.pageListId.replace(/\{|\}/g, "") + "']").length > 0) {
						setTimeout(function () {
							spjs.rm.init(c)
						}, 10);
						return
					}
				}
				if (spjs.rm.data.debug) {
					alert("[SPJS Resource Management]\n\nDebug is activated. Ensure you have the developer console open.")
				}
				if (spjs.rm.text === undefined) {
					spjs.rm.localize()
				}
				spjs.rm.data.fields = init_fields_v2();
				//alert('in fucn ' + c.postcodes);
				var d = [{
					"fin": c.resourceField,
					"id": "Resource field"
				}, {
					"fin": c.dateFrom,
					"id": "Start date field"
				}, {
					"fin": c.dateTo,
					"id": "End date field"
				}
/* 				, {
					"fin": c.postcodes,
					"id": "postcodes id"
				} */
				];
				$.each(d, function (i, o) {
					if (spjs.rm.data.fields[o.fin] === undefined) {
						alert("[SPJS Resource Management]\n\nThe field \"" + o.fin + "\" used for \"" + o.id + "\" was not found. Please check the setup.");
						return
					}
				});
				spjs.rm.data.args = c;
				if (spjs.rm.data.args.listName === undefined || spjs.rm.data.args.listName === "") {
					if (!spjs.rm.data.isSP07) {
						spjs.rm.data.args.listBaseUrl = _spPageContextInfo.webServerRelativeUrl !== "/" ? _spPageContextInfo.webServerRelativeUrl : "";
						spjs.rm.data.args.listName = _spPageContextInfo.pageListId
					} else {
						alert("SPJS Resource Management - It looks like you are using SP 2007\n\nYou must provide the listName in the argument object like this: \"listName\":\"ListGuidOrDisplayName\"")
					}
				}
				if (spjs.rm.data.isSP07) {
					spjs.rm.data.args.listBaseUrl = L_Menu_BaseUrl
				}
				spjs.rm.data.LCID = spjs.rm.getRegionalSettings(spjs.rm.data.args.listName);
				spjs.rm.data.dateFormat = spjs.rm.getDateFormat(spjs.rm.data.LCID.Locale);
				if (typeof spjs.dffs === "undefined") {
					$("#part1").after("<span style='color:gray;font-size:9px;cursor:pointer;' onclick='spjs.rm.gotoSPJS()' title='Enhanced by SPJS Resource Management v" + spjs.rm.version + "'><img src='/_layouts/images/SQUARE.GIF' /></span>")
				}
				if (spjs.rm.data.args !== undefined && spjs.rm.data.args.resourceField !== "" && spjs.rm.data.args.dateFrom !== "" && spjs.rm.data.args.dateTo !== "") {
					if (typeof PreSaveAction === "function") {
						spjsrm_PreSaveAction = PreSaveAction
					}
					PreSaveAction = function () {
						$(".spjs_rm_validation").remove();
						alert(" incide presave ");
						var 
						//the below variable for P0109 NextHoliday date
						nextHolidayDate,notInHoliday,hDate,compareHoliday,
						holiday_friendlyName, holidayControl,holiday_end,
						// finished adding 
						b, res, rVal, selectedHour_start, selectedHour_end, selectedMinute_end, bSetting, dateRange_start, dateRange_end, dateRange_start_friendlyName, dateRange_end_friendlyName, dateMinControl, dateMaxControl, dayByDayObj, bookableDateRangesFriendly, dTemp, inDateRange, inTimeRange, vDate;
						b = spjs.rm.validateDate();
						if (spjs.rm.data.debug) {
							console.log("Current selected date and time:");
							console.log("  " + spjs.rm.isoToCurrFormat(b.from, true) + " (" + spjs.rm.text.dayNumObj[b.from_day] + ") - " + spjs.rm.isoToCurrFormat(b.to, true) + " (" + spjs.rm.text.dayNumObj[b.to_day] + ")")
						}
						if (b.pass) {
							res = spjs.rm.checkDateOverlap(b.from, b.to);
							rVal = getFieldValue(spjs.rm.data.args.resourceField);
							if (res.isOverlap) {
								spjs.rm.appendError(spjs.rm.data.args.resourceField, spjs.rm.text.overlapMsg.replace("{0}", rVal).replace("{1}", res.bookedBy).replace("{2}", res.overlappingRangeStart).replace("{3}", res.overlappingRangeEnd));
								if (spjs.rm.data.debug) {
									console.log("The selected date and time range overlaps an existilng list item.")
								}
								return false
							} else {
								if (spjs.rm.data.args.bookableTimeRangeActive) {
									selectedHour_start = 0;
									if ($(spjs.rm.data.fields[spjs.rm.data.args.dateFrom]).find("select").length > 0) {
										selectedHour_start = parseInt($(spjs.rm.data.fields[spjs.rm.data.args.dateFrom]).find("select:first")[0].selectedIndex, 10)
									}
									selectedHour_end = 0;
									selectedMinute_end = 0;
									if ($(spjs.rm.data.fields[spjs.rm.data.args.dateTo]).find("select").length > 0) {
										selectedHour_end = parseInt($(spjs.rm.data.fields[spjs.rm.data.args.dateTo]).find("select:first")[0].selectedIndex, 10);
										selectedMinute_end = parseInt($(spjs.rm.data.fields[spjs.rm.data.args.dateTo]).find("select:last")[0].selectedIndex, 10)
									}
									bSetting = spjs_QueryItems({
										"listName": spjs.rm.data.settingsListName,
										"listBaseUrl": spjs.rm.getBaseUrl(),
										"query": "<Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + rVal + "</Value></Eq></Where><OrderBy><FieldRef Name='FromDate' /></OrderBy>",
										"viewFields": ["From_0", "To_0", "From_1", "To_1", "From_2", "To_2", "From_3", "To_3", "From_4", "To_4", "From_5", "To_5", "From_6", "To_6", "FromDate", "ToDate","NextHoliday"]
									});
									alert(" bSetting.count " + bSetting.count);
									if (bSetting.count > 0) {
										dayByDayObj = {};
										bookableDateRangesFriendly = [];
										alert("a.NextHoliday outside loop " );
										$.each(bSetting.items, function (i, a) {
										alert("a.NextHoliday inside loop " );
											dateRange_start_friendlyName = "";
											dateRange_end_friendlyName = "";
											//nextHolidayDate ;
											
											if(a.NextHoliday !== null){
												//P01019 -- added this variable for the project
												//alert(" before assigning variable into nextHolidayDate  " + a.NextHoliday);
												var nextHolidayDateinBet = a.NextHoliday;
												//getFullYear() + "-" + dateMinControl.getMonth() + "-" + dateMinControl.getDate()
												nextHolidayDate = a.NextHoliday ;//+ '-' + nextHolidayDateinBet.getMonth() ;//+ '-' + nextHolidayDateinBet.getFullYear() ;
												//alert("THIS THIS a.NextHoliday inside IF statement " + nextHolidayDateinBet);
												//changes ends here 
											
											}

											if (a.FromDate !== null) {
											
												dateRange_start = spjs.rm.isoToDateObj(a.FromDate);
												dateRange_start.setHours(parseInt(a["From_" + dateRange_start.getDay()], 10));
												//alert(" THIS dateRange_start  " + dateRange_start );
												dateMinControl = spjs.rm.isoToDateObj(a.FromDate);
												dateMinControl.setHours(12);
												//alert(" dateMinControl  " + dateMinControl );
												a.FromDate = a.FromDate.split(" ")[0] + " " + a["From_" + dateRange_start.getDay()] + ":00:00";
												//alert(" a.FromDate  " + a.FromDate );
												dateRange_start_friendlyName = spjs.rm.isoToCurrFormat(a.FromDate, false)
												//alert(" THIS dateRange_start_friendlyName  " + dateRange_start_friendlyName );
											}
											if (a.ToDate !== null) {
												dateRange_end = spjs.rm.isoToDateObj(a.ToDate);
												dateRange_end.setHours(parseInt(a["To_" + dateRange_end.getDay()], 10));
												dateMaxControl = spjs.rm.isoToDateObj(a.ToDate);
												dateMaxControl.setHours(12);
												a.ToDate = a.ToDate.split(" ")[0] + " " + a["To_" + dateRange_end.getDay()] + ":00:00";
												dateRange_end_friendlyName = spjs.rm.isoToCurrFormat(a.ToDate, false)
											}
											//holiday_friendlyName, holidayControl,holiday_end,
											if (a.NextHoliday !== null) {
											alert(" BEFORE holiday_end  " + a.NextHoliday );
												holiday_end = spjs.rm.isoToDateObj(a.NextHoliday);
												//alert(" XXX holidayControl  " + holiday_end.getFullYear() + " " + holiday_end.getMonth()+ " " + holiday_end.getDate());
												holiday_end.setHours(parseInt(a["To_" + holiday_end.getDay()], 10));
												holidayControl = spjs.rm.isoToDateObj(a.NextHoliday);
												holidayControl.setHours(12);
												
												a.NextHoliday = a.NextHoliday.split(" ")[0] + " " + a["To_" + holiday_end.getDay()] + ":00:00";
												//alert(" a.nextHolidayDate  " + a.NextHoliday );
												holiday_friendlyName = spjs.rm.isoToCurrFormat(a.NextHoliday, false)
												//alert(" THIS holiday_friendlyName  " + holiday_friendlyName );
											}												
											if (dateRange_start_friendlyName !== "" || dateRange_end_friendlyName !== "") {
												bookableDateRangesFriendly.push(dateRange_start_friendlyName + " - " + dateRange_end_friendlyName)
											}
											while (dateMinControl <= dateMaxControl) {
												dayByDayObj[dateMinControl.getFullYear() + "-" + dateMinControl.getMonth() + "-" + dateMinControl.getDate()] = {
													"date": dateMinControl.toDateString(),
													"fromHour": parseInt(a["From_" + dateMinControl.getDay()], 10),
													"toHour": parseInt(a["To_" + dateMinControl.getDay()], 10)
												};
												dateMinControl.setDate(dateMinControl.getDate() + 1)
											}
										});
										dTemp = new Date(b.from_date.getFullYear(), b.from_date.getMonth(), b.from_date.getDate());
										inDateRange = true;
										inTimeRange = true;
										notInHoliday = true;

										while (dTemp < b.to_date) {
											//alert(" before VDATE " + dTemp.getFullYear() + " UUU " + dTemp.getMonth() + " UUU " + dTemp.getDate() );
											//alert(" b.from_date. " + b.from_date);
											vDate = dayByDayObj[dTemp.getFullYear() + "-" + dTemp.getMonth() + "-" + dTemp.getDate()];
											compareHoliday = b.from_date.getFullYear() + "-" + (b.from_date.getMonth()+1) + "-" + b.from_date.getDate() ;
/* 											alert('vDate 	' + vDate.date + '   Done');										
										alert("BEFORE HOME " + nextHolidayDate );
										alert("THAT HOME FULL" + nextHolidayDate.substring(0,4)+ "-" + nextHolidayDate.substring(6,7) + "-" + nextHolidayDate.substring(8,10));
										alert("THAT HOME Month" + nextHolidayDate.substring(6,7) ) ;
										alert("THAT HOME Month" + nextHolidayDate.substring(8,10) ) ; 
										
										hDate = dayByDayObj[nextHolidayDate.substring(0,4)+ "-" + nextHolidayDate.substring(6,7) + "-" + nextHolidayDate.substring(7,9)];
										alert(" THAT hdate  " + hdate.date);	 */									
											
											//alert("THAT dTempDate"  + dTemp.getFullYear() + "-" + dTemp.getMonth() + "-" + dTemp.getDate())
										hDate = holiday_end.getFullYear() + "-" + (holiday_end.getMonth()+1)+ "-" + holiday_end.getDate();//holiday_friendlyName.substring(0,4)+ "-" + nextHolidayDate.substring(6,7) + "-" + nextHolidayDate.substring(8,10);
										
										alert( "XXX hDate " + hDate + " XXX compareHoliday " +compareHoliday); 
										if (vDate === undefined) {
												if (spjs.rm.data.debug) {
													console.log("Bookable range:\n" + bookableDateRangesFriendly.join("\n"));
													console.log("Not in range:");
													console.log(new Date(dTemp.getFullYear(), (dTemp.getMonth() + 1), dTemp.getDate()))
												}
												inDateRange = false;
												break
											} else {
												if (b.from_date.toDateString() === vDate.date) {
													if (vDate.fromHour > selectedHour_start) {
														if (spjs.rm.data.args.timeFormat === "12") {
															vDate.fromHour = spjs.rm.milToAmPm(vDate.fromHour)
														} else {
															vDate.fromHour = vDate.fromHour + ":00"
														}
														if (spjs.rm.data.debug) {
															console.log("Time must be >= " + vDate.fromHour)
														}
														spjs.rm.appendError(spjs.rm.data.args.dateFrom, spjs.rm.text.notInTimeRange[0].replace("{0}", rVal).replace("{1}", vDate.fromHour).replace("{2}", spjs.rm.text.dayNumObj[b.from_day]));
														inTimeRange = false;
														break
													}
												}
												if (b.to_date.toDateString() === vDate.date) {
													if (vDate.toHour < selectedHour_end || (vDate.toHour === selectedHour_end && selectedMinute_end > 0)) {
														if (spjs.rm.data.args.timeFormat === "12") {
															vDate.toHour = spjs.rm.milToAmPm(vDate.toHour)
														} else {
															vDate.toHour = vDate.toHour + ":00"
														}
														if (spjs.rm.data.debug) {
															console.log("Time must be <= " + vDate.fromHour)
														}
														spjs.rm.appendError(spjs.rm.data.args.dateTo, spjs.rm.text.notInTimeRange[1].replace("{0}", rVal).replace("{1}", vDate.toHour).replace("{2}", spjs.rm.text.dayNumObj[b.to_day]));
														inTimeRange = false;
														break
													}
												}
												
												if (b.to_date.toDateString() === vDate.date) {
												alert("BEFORE THIS bToDate Take1 ");
												//dateRange_end_friendlyName = spjs.rm.isoToCurrFormat(a.ToDate, false)
												alert(" hdate" + hDate) ; // newbtodate =b.to_date.toDateString();
												alert("compareHoliday " + compareHoliday) ;// + " THIS nextHolidayDate " + nextHolidayDate );
												if( compareHoliday === hDate)
													{
														alert("Inside Not inDholiday if Statement");
														//notInTimeRange": ["{0} can be booked from {1} on a {2}.", "{0} can be booked to {1} on a {2}."],
														//spjs.rm.appendError(spjs.rm.data.args.dateFrom, spjs.rm.text.notInTimeRange[0].replace("{0}", rVal).replace("{1}", vDate.fromHour).replace("{2}", spjs.rm.text.dayNumObj[b.from_day]));
														//"onPublicHoliday": ["{0} cannot be booked on {1}.Its a public holiday."],
														//"onPublicHoliday": ["{0} cannot be booked on {1}.Its a public holiday."],
														
														notInHoliday = false;
														alert(" notInHoliday SET to FALSE ");
														break
													}
												}												
											}

											//alert("inside ELSE statement");									

											dTemp.setDate(dTemp.getDate() + 1)
										}
										if (!notInHoliday) {
											alert("In Holiday --Go Back");
											//onPublicHoliday
											spjs.rm.appendError(spjs.rm.data.args.dateFrom, spjs.rm.text.onPublicHoliday[0].replace("{0}", b.to_date.toDateString()));
											return false
										}										
										if (!inDateRange) {
										
										
											spjs.rm.appendError(spjs.rm.data.args.resourceField, spjs.rm.text.bookableDateRange.replace("{0}", rVal).replace("{1}", bookableDateRangesFriendly.join("<br>")));
											return false
										}
										if (!inTimeRange) {
											return false
										}

									}
								}
							}
						} else {
							return false
						}
						if (typeof spjsrm_PreSaveAction === "function") {
							return spjsrm_PreSaveAction()
						} else {
							return true
						}
					}
				}
			},
			"getBaseUrl": function () {
				var a;
				if (spjs.rm.data.isSP07) {
					a = L_Menu_BaseUrl
				} else {
					a = _spPageContextInfo.webServerRelativeUrl !== "/" ? _spPageContextInfo.webServerRelativeUrl : ""
				}
				return a
			},
			"addOrUpdateList": function (b) {alert('in addOrUpdateList');
				if (spjs.utility === undefined || spjs.utility.version < spjs.rm.data.utilityVersion) {
					alert('in 1st IF BLOCK');
					alert("[SPJS Resource Management plugin]\n\nYour current version of SPJS-Utility.js is: " + String(spjs.utility.version) + ". You must upgrade to v" + String(spjs.rm.data.utilityVersion) + " or above.");
					return
				}
				if (!b && !confirm("Add or update the list: " + spjs.rm.data.settingsListName + "?")) {
							alert('in 2nd IF BLOCK');
					return
				}
				var d = ["<CHOICES>"],
					c = 0,
					fBase, fMissing, fDetails, lFields, newList, updList, baseUrl = spjs.rm.getBaseUrl(),
					dFieldsRaw, dFields;
				while (c < 24) {
					d.push("<CHOICE>" + (c < 10 ? "0" + c.toString() : c.toString()) + "</CHOICE>");
					c += 1
				}
				d.push("</CHOICES>");
				fBase = [{
					'Type': 'Choice',
					'DisplayName': 'From_1',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'To_1',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'From_2',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'To_2',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'From_3',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'To_3',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'From_4',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'To_4',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'From_5',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'To_5',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'From_6',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'To_6',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'From_0',
					'AddToView': '1'
				}, {
					'Type': 'Choice',
					'DisplayName': 'To_0',
					'AddToView': '1'
				}, {
					'Type': 'DateTime',
					'DisplayName': 'FromDate',
					'AddToView': '1'
				}, {
					'Type': 'DateTime',
					'DisplayName': 'ToDate',
					'AddToView': '1'
				}];
				fDetails = [{
					'Type': 'Text',
					'Name': 'Title',
					'DisplayName': 'Resource name',
					'Description': '',
					'spjsRMVersion': spjs.rm.version
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'From_1',
					'DisplayName': 'Monday from',
					'content': d.join("") + "<Default>06</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'To_1',
					'DisplayName': 'to',
					'content': d.join("") + "<Default>20</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'From_2',
					'DisplayName': 'Tuesday from',
					'content': d.join("") + "<Default>06</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'To_2',
					'DisplayName': 'to',
					'content': d.join("") + "<Default>20</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'From_3',
					'DisplayName': 'Wednesday from',
					'content': d.join("") + "<Default>06</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'To_3',
					'DisplayName': 'to',
					'content': d.join("") + "<Default>20</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'From_4',
					'DisplayName': 'Thursday from',
					'content': d.join("") + "<Default>06</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'To_4',
					'DisplayName': 'to',
					'content': d.join("") + "<Default>20</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'From_5',
					'DisplayName': 'Friday from',
					'content': d.join("") + "<Default>06</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'To_5',
					'DisplayName': 'to',
					'content': d.join("") + "<Default>20</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'From_6',
					'DisplayName': 'Saturday from',
					'content': d.join("") + "<Default>06</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'To_6',
					'DisplayName': 'to',
					'content': d.join("") + "<Default>20</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'From_0',
					'DisplayName': 'Sunday from',
					'content': d.join("") + "<Default>06</Default>",
					'Description': ''
				}, {
					'Type': 'Choice',
					'Format': 'Dropdown',
					'Name': 'To_0',
					'DisplayName': 'to',
					'content': d.join("") + "<Default>20</Default>",
					'Description': ''
				}, {
					'Type': 'DateTime',
					'Name': 'FromDate',
					'DisplayName': 'From date [Optional] ',
					'Format': 'DateOnly',
					'Description': 'Bookable FROM this date.'
				}, {
					'Type': 'DateTime',
					'Name': 'ToDate',
					'DisplayName': 'To date [Optional]',
					'Format': 'DateOnly',
					'Description': 'Bookable TO this date.'
				}];
				if (b) {
					fMissing = [];
					lFields = spjs.rm.getListFields(spjs.rm.data.settingsListName, baseUrl);
					if (lFields.spjsRMVersion === spjs.rm.version) {
						alert("Your configuration list is already updated to the latest version.");
						return
					} else if (lFields.spjsRMVersion === "") {
						dFieldsRaw = ["From", "To"];
						dFields = [];
						$.each(dFieldsRaw, function (i, a) {
							if (lFields[a] !== undefined) {
								dFields.push(a)
							}
						});
						if (dFields.length > 0 && confirm("It looks like you are upgrading from a version prior to v2.2.\n\nYou must remove these fields from the configuration list:\n\n" + dFields.join(", ") + "\n\nClick OK to do this automatically, or open the list and do it manually.")) {
							updList = spjs_UpdateList(spjs.rm.data.settingsListName, baseUrl, [], [], dFields);
							if (updList.success) {
								alert("The fields were deleted successfully.")
							} else {
								alert(updList.errorText)
							}
						}
					}
					$.each(fBase, function (i, o) {
						if (lFields[o.DisplayName] === undefined) {
							fMissing.push(o)
						}
					});
					fBase = fMissing
				} else {
					newList = spjs_AddList(spjs.rm.data.settingsListName, baseUrl, spjs.rm.data.settingsListDescription)
				}
				if (b || newList.success) {
					updList = spjs_UpdateList(spjs.rm.data.settingsListName, baseUrl, fBase, fDetails);
					if (!updList.success) {
						alert("[SPJS RM UpdateList]\n\n" + updList.errorText)
					} else {
						alert("The list was added / updated successfully. The page will reload.");
						location.href = location.href
					}
				} else {
					alert("[spjs_AddList]\n\nAn error occurred.")
				}
			},
			"getListFields": function (c, d) {
				var b = [],
					f = {};
				b.push('<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/">');
				b.push('<listName>' + c + '</listName>');
				b.push('</GetList>');
				spjs_wrapSoapRequest(d + '/_vti_bin/lists.asmx', 'http://schemas.microsoft.com/sharepoint/soap/GetList', b.join(''), function (a) {
					$(a).find('Field').each(function () {
						if ($(this).attr('Name') === "Title") {
							f.spjsRMVersion = $(this).attr('spjsRMVersion');
							if (f.spjsRMVersion === undefined) {
								f.spjsRMVersion = ""
							}
						}
						if ($(this).attr('DisplayName') !== undefined) {
							f[$(this).attr('Name')] = {
								"disp": $(this).attr('DisplayName'),
								"descr": $(this).attr('Description')
							}
						}
					})
				});
				return f
			},
			"verifyTimeRangeList": function () {
				if (!spjs.rm.hasList()) {
					spjs.rm.addOrUpdateList(false)
				} else {
					if (confirm("The list \"" + spjs.rm.data.settingsListName + "\" exists, check for updates?")) {
						spjs.rm.addOrUpdateList(true)
					}
				}
			},
			"hasList": function () {
				var a = spjs_QueryItems({
					"listName": spjs.rm.data.settingsListName,
					"listBaseUrl": spjs.rm.getBaseUrl(),
					"query": "<Where><IsNotNull><FieldRef Name='ID' /></IsNotNull></Where>",
					"viewFields": ["ID"],
					"rowLimit": 1
				});
				if (a.count < 0) {
					return false
				} else {
					return true
				}
			},
			"getDateFormat": function (a) {
				var b, format;
				if (spjs.rm.data.lcidToDateFormat[a] !== undefined) {
					b = spjs.rm.data.lcidToDateFormat[a].match(/[^dmy]/)[0];
					format = spjs.rm.data.lcidToDateFormat[a].split(b).join("");
					return {
						'full': spjs.rm.data.lcidToDateFormat[a],
						'format': format,
						'separator': b
					}
				} else {
					alert("The date format for LCID " + a + " is not configured.\n\nEither make a request for an update here:\nhttp://spjsblog.com\n\nOr add the correct format in the variable \"spjs.rm.data.lcidToDateFormat\".")
				}
			},
			"getRegionalSettings": function (c) {
				var b, r;
				b = [];
				b.push('<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/">');
				b.push('<listName>' + c + '</listName>');
				b.push('</GetList>');
				r = {
					success: false
				};
				spjs_wrapSoapRequest(spjs.rm.data.args.listBaseUrl + '/_vti_bin/lists.asmx', 'http://schemas.microsoft.com/sharepoint/soap/GetList', b.join(''), function (a) {
					r.Language = $(a).find('RegionalSettings').find('Language').text();
					r.Locale = $(a).find('RegionalSettings').find('Locale').text()
				});
				return r
			},
			"localize": function () {
				spjs.rm.text = {
					//- changed for P0109 - begins here
					//"overlapMsg": "{0} has already been booked by {1} between {2} and {3}.",
					"overlapMsg": "Truck has already been booked by {1} between {2} and {3}.", // new message as there is only one truck for the area- changed for P0109
					//- changed for P0109 - finishes here
					"endBeforeStartMsg": "End time cannot be less than or equal to start time.",
					"empty": "{0} cannot be left empty!",
					"wrongDateFormat": "Please use this date format: {0}",
					"notInTimeRange": ["{0} can be booked from {1} on a {2}.", "{0} can be booked to {1} on a {2}."],
					"notInDateRange": ["{0} cannot be booked before {1}.", "{0} cannot be booked after {1}."],
					"onPublicHoliday": ["Truck cannot be booked on {0}.Its a public holiday."],
					"bookableDateRange": "The bookable date ranges for {0} are:<br>{1}",
					"dayNumObj": {
						0: "Sunday",
						1: "Monday",
						2: "Tuesday",
						3: "Wednesday",
						4: "Thursday",
						5: "Friday",
						6: "Saturday"
					}
				}
			},
			"gotoSPJS": function () {
				if (confirm("This will open http://spjsblog.com in a new window.\n\nProceed?")) {
					window.open('http://spjsblog.com/2014/04/20/resource-management-now-compatible-with-dffs/')
				}
			},
			"appendError": function (b, c) {
				var d, ct;
				$(spjs.rm.data.fields[b]).find('td.ms-formbody:last').append("<div id='spjs_rm_validation_" + b + "' class='spjs_rm_validation' style='display:none;color:red;'>" + c + "</div>").focus();
				$("#spjs_rm_validation_" + b).fadeIn(200);
				if (typeof spjs.dffs !== "undefined") {
					$("#tabWrapper").find('li.tabBase').each(function (i, a) {
						d = a.id;
						if ($.inArray(b, spjs.dffs.data.tabConfigObj[d.split("_")[2]].fields) > -1) {
							ct = $("#" + d);
							if (!ct.hasClass('tabFormValidation')) {
								ct.addClass('tabFormValidation')
							}
							return false
						}
					})
				}
			},
			"checkDateOverlap": function (a, b) {
					
					//- changed for P0109 - begins here
					
					var postcodes;
					var splitpostcodes;
					postcodes= spjs.rm.data.args.postcodes; //fetch the variable from  the arguement passed from the CEWP
					splitpostcodes = postcodes.split(';') ; //split the data(i.e. resources in the variable) and place it in anew variable
					
					//- changes for P0109 - finishes here
					var c, res, result,overlapcount=0;

					result = {
						isOverlap: false
					};
					
					//- changes for P0109 - begins here. This Loop is to go through all the postcodes that this area has.
					// Bunch of postcodes has been pulled from the from the end CEWP code and passed to the back using the spjsRmArgs variable.
					
					for(var i = 1; i < splitpostcodes.length; i++) 
					{
					
						c = [];
						c.push("<And>");
						c.push("<And>");
						c.push("<Leq>");
						c.push("<FieldRef Name='" + spjs.rm.data.args.dateFrom + "' /><Value Type='DateTime' IncludeTimeValue='TRUE'>" + b + "</Value>");
						c.push("</Leq>");
						c.push("<Geq>");
						c.push("<FieldRef Name='" + spjs.rm.data.args.dateTo + "' /><Value Type='DateTime' IncludeTimeValue='TRUE'>" + a + "</Value>");
						c.push("</Geq>");
						c.push("</And>");
						c.push("<Eq>");
						c.push("<FieldRef Name='" + spjs.rm.data.args.resourceField + "' /><Value Type='Text'>" + splitpostcodes[i] + "</Value>");
						c.push("</Eq>");
						c.push("</And>");
						
						if (spjs.rm.data.thisId !== '') {
							c.unshift("<And>");
							c.push("<Neq>");
							c.push("<FieldRef Name='ID' /><Value Type='Integer'>" + spjs.rm.data.thisId + "</Value>");
							c.push("</Neq>");
							c.push("</And>")
						}
						c.unshift("<Where>");
						c.push("</Where>");
						//alert(' C ' + c );
						res = spjs_QueryItems({
							"listName": spjs.rm.data.args.listName,
							"listBaseUrl": spjs.rm.data.args.listBaseUrl,
							"query": c.join(''),
							"viewFields": ["ID", "Title", "Editor", spjs.rm.data.args.dateFrom, spjs.rm.data.args.dateTo]
						});
						//alert("res " + res.count);
						
						
/* 					    
						if (res.count > 0) {
							result.isOverlap = true;
							result.overlappingRangeStart = spjs.rm.isoToCurrFormat(res.items[0][spjs.rm.data.args.dateFrom], true);
							result.overlappingRangeEnd = spjs.rm.isoToCurrFormat(res.items[0][spjs.rm.data.args.dateTo], true);
							result.bookedBy = res.items[0].Editor.split(';#')[1]
						} else {
							return false
						}
						return result */
						
						//- changes for P0109 - begins here. 
						//Change Decription : Here the result will be 
						//false -- If no booking.
						//true  -- there is already an existing booking.
						//Hence if any of the postcodes have a booking then the system returns a true.In this case the overlapcount is set to 1
						
						if (res.count > 0) {
							overlapcount=1 ;
							result.isOverlap = true;
							result.overlappingRangeStart = spjs.rm.isoToCurrFormat(res.items[0][spjs.rm.data.args.dateFrom], true);
							result.overlappingRangeEnd = spjs.rm.isoToCurrFormat(res.items[0][spjs.rm.data.args.dateTo], true);
							result.bookedBy = res.items[0].Editor.split(';#')[1]
						} else {
							//return false
						}
						
						//alert("result " + result);
					}
					if(overlapcount == 0)
					{
					//alert("before false");
						//No bookings present . Al clear for a new booking.
						return false;
					}
					return result;
					
						//changes for P0109 - finishes here. 					
			},
			"milToAmPm": function (a, b) {
				var h, ampm;
				ampm = " AM";
				h = parseInt(a, 10);
				if (h > 12) {
					h = h - 12;
					ampm = " PM"
				}
				return h + ":" + (b !== undefined ? b : "00") + ampm
			},
			"isoToCurrFormat": function (a, b) {
				var c, formatArr, strSplit, time, obj;
				if (a === null) {
					return ""
				}
				c = spjs.rm.data.dateFormat.separator;
				formatArr = spjs.rm.data.dateFormat.full.split(c);
				strSplit = a.split(/T| |:|-|z/i);
				obj = {
					'y': strSplit[0],
					'm': strSplit[1],
					'd': strSplit[2]
				};
				if (b) {
					time = strSplit[3] + ":" + strSplit[4];
					if (spjs.rm.data.args.timeFormat === "12") {
						time = spjs.rm.milToAmPm(strSplit[3], strSplit[4])
					}
					return obj[formatArr[0]] + c + obj[formatArr[1]] + c + obj[formatArr[2]] + " " + time
				} else {
					return obj[formatArr[0]] + c + obj[formatArr[1]] + c + obj[formatArr[2]]
				}
			},
			"isoToDateObj": function (a) {
				var b, time, obj;
				if (a === null) {
					return ''
				}
				b = a.split(/T| /)[0].split('-');
				obj = {
					'y': b[0],
					'm': b[1],
					'd': b[2]
				};
				time = a.substring(11, 16).split(":");
				return new Date(parseInt(obj.y, 10), parseInt(obj.m, 10) - 1, parseInt(obj.d, 10), time[0], time[1])
			},
			"strToDateObj": function (a) {
				var b, year, month, day, hour, min, dArr;
				b = $(spjs.rm.data.fields[a]).find('input:first').val();
				hour = "12";
				min = "00";
				if ($(spjs.rm.data.fields[a]).find("select").length > 0) {
					hour = $(spjs.rm.data.fields[a]).find('select:first')[0].selectedIndex;
					min = $(spjs.rm.data.fields[a]).find('select:last').val()
				}
				if (b === '') {
					return false
				}
				dArr = b.split(spjs.rm.data.dateFormat.separator);
				if (dArr.length < 3) {
					return false
				}
				year = dArr[spjs.rm.data.dateFormat.format.indexOf('y')].toString();
				month = dArr[spjs.rm.data.dateFormat.format.indexOf('m')].toString();
				day = dArr[spjs.rm.data.dateFormat.format.indexOf('d')].toString();
				if (year === '' || month === '' || day === '') {
					return false
				}
				if (year.length === 2) {
					year = "20" + year
				}
				return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), hour, min)
			},
			"validateDate": function () {
				var b, fullDate, cDate, cDatedArr, result, key;
				cDatedArr = [];
				result = {
					pass: true
				};
				b = [spjs.rm.data.args.dateFrom, spjs.rm.data.args.dateTo];
				$.each(b, function (i, a) {
					$("#spjs_rm_validation_" + a).remove();
					fullDate = $(spjs.rm.data.fields[a]).find('input:first').val();
					if (fullDate === '') {
						spjs.rm.appendError(a, spjs.rm.text.empty.replace("{0}", $(spjs.rm.data.fields[a]).attr('FieldDispName')));
						result.pass = false;
						return false
					} else {
						$.each(fullDate.split(/[^\d]/), function (j, v) {
							if (parseInt(v, 10) < 1) {
								result.pass = false;
								spjs.rm.appendError(a, spjs.rm.text.wrongDateFormat.replace("{0}", spjs.rm.data.lcidToDateFormat[spjs.rm.data.LCID.Locale]));
								return false
							}
						})
					}
					cDate = spjs.rm.strToDateObj(a);
					if (!cDate) {
						spjs.rm.appendError(a, spjs.rm.text.wrongDateFormat.replace("{0}", spjs.rm.data.lcidToDateFormat[spjs.rm.data.LCID.Locale]));
						result.pass = false;
						return false
					}
					if (cDatedArr.length === 0) {
						cDate.setMinutes(cDate.getMinutes() + 1)
					} else {
						cDate.setMinutes(cDate.getMinutes() - 1)
					}
					cDatedArr.push(cDate);
					key = "from";
					if (i > 0) {
						key = "to"
					}
					result[key] = cDate.getFullYear().toString() + "-" + (cDate.getMonth() + 1).toString() + "-" + cDate.getDate().toString() + "T" + cDate.getHours().toString() + ":" + cDate.getMinutes().toString() + ":00Z";
					result[key + "_day"] = cDate.getDay();
					result[key + "_date"] = cDate;
					if (cDatedArr.length > 1) {
						if (cDatedArr[0] >= cDatedArr[1]) {
							spjs.rm.appendError(a, spjs.rm.text.endBeforeStartMsg);
							result.pass = false;
							return false
						}
					}
				});
				//alert("date a " + a + "  result " +result);
				return result
			},
			"toISO8601": function (a) {
				if (a === null) {
					return null
				}
				var y, m, d, min, hour;
				y = a.getFullYear().toString();
				m = (a.getMonth() + 1).toString();
				d = a.getDate().toString();
				min = a.getMinutes().toString();
				if (min.length < 2) {
					min = "0" + min
				}
				hour = a.getHours().toString();
				if (hour.length < 2) {
					hour = "0" + hour
				}
				return y + "-" + m + "-" + d + "T" + hour + ":" + min + ":00"
			}
		};
