class GraphTransportation {

	 p = [];		// массив производителей
	 countP;		// их количество
	 c = [];		// массив потребителей
	 contC;			// их количество
	 pc = [];	//массив цен
	 iterCount = -1; //итерация

	 deltaQ = 0;// товары за итерацию
	 deltaPC = 0;// цена за товар за итерацию
	 
	 currentQ = 0;	// текущии перевезенные товары
	 currentC = 0;	// текущии расходы

	 targetQ =0;	// сколько нужно перевести

	 graphT = []; // массив который содержит граф


	 mainBlock = $("<div></div>");

	 outputBlock = $("<div></div>");

	 outputGrapthArray = $("<div></div>");

	 setData = $("<div></div>");
	 setP = $("<table><tr></tr></table>");
	 setC = $("<table><tr></tr></table>");
	 setPC = $("<table></table>");
	 butGen = $("<input class='but' type='button' value='Generate graph'></input>&nbsp&nbsp");
	 butDel = $("<input class='but' type='button' value='Delete Graph'></input><br><br><hr>");

	 static graphExist = 0;

	static graphId = -1; // счетчик id для обьектов
	static allG = [];  // массив с сылками на все созданные обьеков
	thisId;				// уникальное id для обьекта

	static graphIdInc () { // инкримент счетика
		this.graphId++;
	}

	static whoAmI (id, type, iterCountNum) { // нужно для нахождения обьекта когда нажимаешь на кнопку решить задачу
		for (let i=0;i<this.allG.length;i++) {
			if (id == this.allG[i].thisId) {

				if (type == 1) {
					this.allG[i].getUserData(id);
					break;
				}
				if (type == 2) {
					this.allG[i].iter();
					break;
				}
				if (type == 3) {

					if (iterCountNum != 0) {

						this.iterCount = -1;
						this.allG[i].getUserData(id);

						for (let n=0; n<parseInt(iterCountNum -1);n++) {
							this.allG[i].iter();
						}
					}
					break;
				}
				if (type == 4) {

					this.allG[i].deleteG();
					this.allG[i] = "undefined";
					break;
				}
			}
		}
	}

	deleteG () {
		this.constructor.graphExist--;
		$("main").height(-this.mainBlock.height() + $("main").height());
		this.mainBlock.html("");
		this.mainBlock.remove();

		$('.' +this.thisId +'del').eq(0).remove();

		if (this.constructor.graphExist==0) {
			$("main").height("70%");
			$("main").height($("main").height()- $("header").height);
		}
	}

	constructor (timesP, timesC, v21) {
		this.constructor.graphExist++;
		if (this.constructor.graphExist==1) {
			$("main").height("120px");
		}


		this.countP= timesP;
		this.countC= timesC;

		this.constructor.graphIdInc();
		this.thisId = this.constructor.graphId;
		this.constructor.allG.push(this);

		this.mainBlock.attr("class",this.thisId + "del");

		let content = "";
		for (let i=0;i<timesP;i++) {
			let num = i+1;
			content += "<td> P" + num + " <input id='" + this.thisId + "P" + i + "'></input></td>";  
		}
		this.setP.html(content);

		content = "";
		for (let i=0;i<timesC;i++) {
			let num = i+1;
			content += "<td> C" + num + " <input id='" + this.thisId + "C" + i + "'></input></td>"; 
		}
		this.setC.html(content);

		content = "<tr><td></td>";

		for (let i = 1;i<timesP+1;i++) {
			content += "<td>P" + i + "</td>";
		}
		content += "</tr>";
		for (let i=0;i<timesC;i++) {
			let num = i+1;
			content += "<tr><td>C" + num + "</td>";
			for (let j=0;j<timesP;j++) {
				content += "<td><input id='" + this.thisId + "PC" + i + j + "'></input></td>";
			}
			content += "</tr>";
		}
		this.setPC.html(content);

		$('#graph').after(this.mainBlock);

		this.mainBlock.html(this.setData);

		this.butDel.attr("id",this.thisId); 
		this.butDel.attr("onClick", this.constructor.name + ".whoAmI(this.id,4)"); 

		this.butGen.attr("id",this.thisId); 
		this.butGen.attr("onClick", this.constructor.name + ".whoAmI(this.id,1)");                                  

		this.setData.html(this.setP);

		let num = this.thisId+1;
		this.setP.before("<h3>Graph " + num + "</h3><p>Producers:<p>"); 
		this.setP.after(this.setC);
		this.setC.before("<p>Consumer:<p>");
		this.setC.after(this.setPC);
		this.setPC.before("<p>Price of one product:<p>"); 

		
		this.setPC.after(this.butDel);
		this.setPC.after("<div style='display: inline'>&nbsp&nbsp</div>");
		this.setPC.after(this.butGen);

		this.setPC.after("<br>");

		this.setData.after(this.outputGrapthArray);

		this.mainBlock.after("<br class='"+this.thisId+"del'>");

		$("main").height(this.mainBlock.height() + $("main").height());

		if (v21) {
			
			$("#" + this.thisId + "P" + 0).val(76);
			$("#" + this.thisId + "P" + 1).val(48);
			$("#" + this.thisId + "P" + 2).val(66);
			
		
			$("#" + this.thisId + "C" + 0).val(26);
			$("#" + this.thisId + "C" + 1).val(69);
			$("#" + this.thisId + "C" + 2).val(51);
			$("#" + this.thisId + "C" + 3).val(39);
			
			
			$("#" + this.thisId + "PC" + 0 + 0).val(10);
			$("#" + this.thisId + "PC" + 0 + 1).val(16);
			$("#" + this.thisId + "PC" + 0 + 2).val(26);
			$("#" + this.thisId + "PC" + 1 + 0).val(11);
			$("#" + this.thisId + "PC" + 1 + 1).val(18);
			$("#" + this.thisId + "PC" + 1 + 2).val(30);
			$("#" + this.thisId + "PC" + 2 + 0).val(9);
			$("#" + this.thisId + "PC" + 2 + 1).val(20);
			$("#" + this.thisId + "PC" + 2 + 2).val(28);
			$("#" + this.thisId + "PC" + 3 + 0).val(13);
			$("#" + this.thisId + "PC" + 3 + 1).val(20);
			$("#" + this.thisId + "PC" + 3 + 2).val(35);

		}

	}

	getUserData (id) {
		this.targetQ=0;
		this.iterCount=-1;
		this.deltaQ = 0
		this.deltaPC = 0;
		this.currentQ = 0;
		this.currentC = 0;
		this.graphT = [];
		this.GetP(id);
		this.GetC(id);
		this.GetPC(id);

		for (let i=0;i<this.c.length;i++) {
			this.targetQ += parseInt(this.c[i]);
		} 

		this.createZeroGraph(); 
		this.outputArray();

	}

	GetP(id) {
		for (let i=0;i<this.countP;i++) {
			this.p[i]=($("#" + id + "P" + i).val());
		}
	}

	GetC(id) {
		for (let i=0;i<this.countC;i++) {
			this.c[i]=($("#" + id + "C" + i).val());
		}
	}

	GetPC(id) {
		for (let i=0;i<this.countC;i++) {
			this.pc[i] = new Array();
			for (let j=0;j<this.countP;j++) {
				this.pc[i][j]=($("#" + id + "PC" + i + j).val());
			}
		}
	}

	createZeroGraph () {
		/* structure:
		[
			[
				[other_id, q, d], // всегда исходит связь
				[other_id, q, d],
				...
			],
			[
				[other_id, q, d],
				[other_id, q, d],
				...
			],
			...
		] 
		*/

		let count=0;

		this.graphT[0] = new Array();
			
		count++;
		
		//создание S точки
		for (let j=0;j<this.countP;j++){
			this.graphT[0][j] = new Array();
			this.graphT[0][j][0] = count;
			this.graphT[0][j][1] = this.p[j];
			this.graphT[0][j][2] = 0;

			this.graphT[count] = new Array();
			this.graphT[count][0] = new Array();
			this.graphT[count][0][0] = 0;
			this.graphT[count][0][1] = 0;
			this.graphT[count][0][2] = -0;

			count++;
		}

		//создание P точек
		for (let i=0;i<this.countP;i++) {
			for (let j=0;j<this.countC;j++) {

				this.graphT[i+1][j+1] = new Array();
				this.graphT[i+1][j+1][0] = count;
				this.graphT[i+1][j+1][1] = this.c[j];
				this.graphT[i+1][j+1][2] = this.pc[j][i];

				if (i == 0) {
					this.graphT[count] = new Array();
				}

				this.graphT[count][i] = new Array();
				this.graphT[count][i][0] = i+1;
				this.graphT[count][i][1] = 0;
				this.graphT[count][i][2] = -this.pc[j][i];;

				count++;
			}
			count = count - this.countC;
		}

		count = count + this.countC;


		//создание P точки
		this.graphT[count] = new Array();
		//создание C точек
		for (let i =1;i<this.countC+1;i++) {
			this.graphT[this.countP + i].unshift(new Array());
			this.graphT[this.countP + i][0][0] = count;
			this.graphT[this.countP + i][0][1] = this.c[i-1];
			this.graphT[this.countP + i][0][2] = 0;

			this.graphT[count][i-1] = new Array();
			this.graphT[count][i-1][0] = this.countP + i;
			this.graphT[count][i-1][1] = 0;
			this.graphT[count][i-1][2] = -0;


		}

	}

	procesDataWCP = new Array();
	maxStack = 0;
	countI;

	iter () {

		if (this.targetQ <= this.currentQ) {
			return;
		}
		
		this.procesDataWCP = new Array();
		this.maxStack = 0;

		let cost = []; //цена
		let productCount = []; //товар
		let way = []; //путь

		let data = [];

		let firstElem = 0;
		let finalElem = this.graphT.length-1;

		way[0] = firstElem;

		this.countI=0;
		console.clear();
		console.log("way\t\tproductCount\t\tcost\n");

		this.searchAllWay(cost,productCount,way,0,finalElem,firstElem,120);
		this.searchBestWay (cost,productCount,way);
		
	}

	searchAllWay (cost,product,way,k,finalElem,firstElem,maxLength) {

		this.maxStack++;

		for (let i = 0; i<this.graphT[way[k]].length; i++) {
			let tmp = false;

			if ((this.maxStack>2000) || (maxLength<=way.length)) {
				break;
			}

			if ((parseInt(this.graphT[way[k]][i][1])>0) && (this.graphT[way[way.length-1]][i][0]!=firstElem) && this.isInCycle(way,this.graphT[way[way.length-1]][i][0])) {

				tmp=true;

				product[k] = this.graphT[way[k]][i][1];
				cost[k] = this.graphT[way[k]][i][2];
				way[k+1] = this.graphT[way[k]][i][0];	

				if ((way[way.length-1] == finalElem)) {

					let finalElemRef;

					this.procesDataWCP[this.countI] = new Array();
					this.procesDataWCP[this.countI][0] = new Array();
					this.procesDataWCP[this.countI][1] = new Array();
					this.procesDataWCP[this.countI][2] = new Array();

					for (let j=0;j<way.length-1;j++) {

						this.procesDataWCP[this.countI][0][j] = way[j];
						this.procesDataWCP[this.countI][1][j] = product[j];
						this.procesDataWCP[this.countI][2][j] = cost[j];

					}

					this.procesDataWCP[this.countI][0][way.length-1] = way[way.length-1];
					console.log(this.procesDataWCP[this.countI][0] + "\t\t" + this.procesDataWCP[this.countI][1] + "\t\t" + this.procesDataWCP[this.countI][2] + "\n");
					this.countI++;	
				}
				this.searchAllWay(cost,product,way,way.length-1,finalElem,firstElem,maxLength);
				
			}
			if (tmp) {
				way.pop();
				product.pop();
				cost.pop();
			}
		}
	}

	isInCycle (way,next) {
	    for (let z = 0; z<way.length; z++) {
	        if (way[z] == next) {
	            return false;
	        }
	    }
	    return true;
	}

	searchBestWay (cost,productCount,way) {

		console.log("Function searchAllWay called " + this.maxStack + "\n");

		let bestId, BestCostNum = 999999, bestProductCount = 0, bestWayLength = 999;

		for (let i = 0; i<this.procesDataWCP.length; i++) {
			if ((parseInt(BestCostNum) >= this.procesDataWCP[i][2].reduce((a, b) => parseInt(a) + parseInt(b), 0)) ) {
				BestCostNum = parseInt(this.procesDataWCP[i][2].reduce((a, b) => parseInt(a) + parseInt(b), 0));
				bestId=i;
			}
		}

		for (let i = 0; i<this.procesDataWCP.length; i++) {
			if ((bestWayLength >= this.procesDataWCP[i][0].length) && (parseInt(BestCostNum) == this.procesDataWCP[i][2].reduce((a, b) => parseInt(a) + parseInt(b), 0))) {	
				bestWayLength = this.procesDataWCP[i][0].length;
				bestId=i;
			}
		}

		for (let i = 0; i<this.procesDataWCP.length; i++) {
			if ((bestProductCount <= parseInt(Math.min.apply(Math,this.procesDataWCP[i][1]))) && (parseInt(BestCostNum) == this.procesDataWCP[i][2].reduce((a, b) => parseInt(a) + parseInt(b), 0))) {	
				bestProductCount = parseInt(Math.min.apply(Math,this.procesDataWCP[i][1]));
				bestId=i;		
			}
		}

		way = this.procesDataWCP[bestId][0];
		productCount = this.procesDataWCP[bestId][1];
		cost = this.procesDataWCP[bestId][2];

		this.procesData(cost,productCount,way);
	}

	procesData (cost,productCount,way) {

		this.deltaQ = parseInt(Math.min.apply(Math,productCount)); // сколько тавара можем перевести
	 	this.deltaPC = parseInt(cost.reduce((a, b) => parseInt(a) + parseInt(b), 0)); // мин цена

	 	if (this.targetQ > (this.deltaQ + this.currentQ)) {
	 		this.currentQ += this.deltaQ;	
	 		this.currentC += this.deltaPC*this.deltaQ;
	 	} else if (this.targetQ < (this.deltaQ + this.currentQ)) {

	 		this.deltaQ = this.deltaQ -((this.deltaQ + this.currentQ) - this.targetQ);
	 		this.currentQ += this.deltaQ;	
	 		this.currentC += this.deltaPC*this.deltaQ;
	 		
	 		

	 	} else if (this.targetQ == (this.deltaQ + this.currentQ)) {
	 		this.currentQ += this.deltaQ;	
	 		this.currentC += this.deltaPC*this.deltaQ;
	 		
	 	}
	 	
	 	this.changeArray(way);
	 	this.outputArray(cost,productCount,way);

	}

	changeArray (way) {
		
		for (let i = 0; i<way.length-1; i++) {

			for (let j = 0; j<this.graphT[way[i]].length; j++) {
				if (this.graphT[way[i]][j][0] == way[i+1]) {

					this.graphT[way[i]][j][1] -= this.deltaQ;

					for (let l = 0; l<this.graphT[way[i+1]].length; l++) {
						if (this.graphT[way[i+1]][l][0] == way[i]) {
							this.graphT[way[i+1]][l][1] += this.deltaQ;
						}
					}
				}
			}
		}
	}

	outputArray (cost = "-",productCount = "-",way = "-") {
		this.iterCount++;
		let tmp1 = false;
		let tmpNum;

		$("main").height(-this.mainBlock.height() + $("main").height());

		let output = "<h3>Iteration "+ this.iterCount +":</h3><div>Table of conections:</div><table class='output'>";



		for (let f=0;f<this.graphT.length;f++) {
			output += "<tr>";
			for (let l=-1;l<this.graphT[f].length;l++) {

				if (l == -1) {
					let num = f;
					tmpNum = f;

					if (this.changeTableColor(f,way)) {
						output +="<td style='border-color: #330000;background: #330000;color: #d18c47;'>";
						tmp1=true;
					} else {
						output +="<td>";
						tmp1=false;
					}

					if (f == 0) {
						output +="&nbsp&nbsp S: &nbsp&nbsp";
					}

					if (f == this.graphT.length-1) {
						output +="&nbsp&nbsp T: &nbsp&nbsp";
					}

					if ((f != 0) && (f != this.graphT.length-1)) {
						if (f < this.countP+1) {
							output +="&nbsp&nbsp P" + num + ": &nbsp&nbsp";
						} else {
							output +="&nbsp&nbsp C" + parseInt(num - this.countP) + ": &nbsp&nbsp";
						}
					}
				}

				if (l != -1) {
					output +="&nbsp&nbsp";
					for (let z=0;z<this.graphT[f][l].length;z++) {

						if (l != -1) {
							if (z==0) {
								if (this.changeTableColor(this.graphT[f][l][z],way) && tmp1 && this.twoNodesIsConect(tmpNum,this.graphT[f][l][z],way)) {
									output +="<td style='border-color: #330000;background: #330000;color: #d18c47;'>";
								} else {
									output +="<td>";
								}

								if (this.graphT[f][l][z]==0) {
									output += "S &nbsp&nbsp";
								}
								if (this.graphT[f][l][z]>0 && this.graphT[f][l][z]<(this.countP+1)) {
									output += "P" + this.graphT[f][l][z] + " &nbsp&nbsp";
								}
								if (this.graphT[f][l][z]>this.countP && this.graphT[f][l][z]<(this.countC+this.countP+1)) {
									output += "C" + parseInt(this.graphT[f][l][z] - this.countP) + " &nbsp&nbsp";
								}
								if (this.graphT[f][l][z] == (this.countC+this.countP+1)) {
									output += "T &nbsp&nbsp";
								}
							} else {
								output += this.graphT[f][l][z] + "&nbsp&nbsp";
							}
						}

					}
				}
				output +="</td>";
			}
			output +="</tr>";
			tmp1=false;
		}



		output += "</table><br>";

		output += "<div>Graph:</div>";

		output += "<p class='t' id='" + this.thisId + "canvas'></p>"

		output += "delta q = { " + productCount + " } = " + this.deltaQ + "<br>";
		output += "|q*| = " + this.targetQ + "<br>";
		output += "|q| = " + parseInt(this.currentQ - this.deltaQ) + " + " + this.deltaQ + " = " + this.currentQ + "<br>";
		output += "|c| = " + parseInt(this.currentC - this.deltaQ * this.deltaPC) + " + " + this.deltaQ + " * ";

		if (cost.length>3) {
			output += "(";
			for (let i=1;i<cost.length-1;i++) {
				if (i==1) {
					output += cost[i];
				} else {
					if (cost[i]>=0) {
						output += "+" + cost[i];
					}
					if (cost[i]<0) {
						output += cost[i];
					}
				}
			}
			output += ")";
		} else {
			if (cost.length == 1) {
				output += cost;
			} else {
				output += cost[1];
			}
		}
		output += " = " + this.currentC + "<br>";

		if (cost == "-") {
			output += "way = { -";
		} else {
			output += "way = { S > ";
		}

		for (let i = 1;i<way.length-1;i++) {
			if (way[i]< this.countP+1) {
				output += " P" + way[i] + " >";
			} else {
				output += " C" + parseInt(way[i] - this.countP) + " >";
			}
		}

		if (cost == "-") {
			output += " } " + "<br>";
		} else {
			output += " T } " + "<br>";
		}

		output += "<br><input class='but' type='button' value='Prev iter' id='"+ this.thisId +"' onclick='" + this.constructor.name + ".whoAmI(this.id,3,"+this.iterCount+")'></input>&nbsp&nbsp"; 

		output += "<input class='but' type='button' value='Next iter' id='"+ this.thisId +"' onclick='" + this.constructor.name + ".whoAmI(this.id,2)'></input><br><br><hr>"; 

		this.outputGrapthArray.html(output);
		this.drawGraph(way);
		$("main").height(this.mainBlock.height() + $("main").height());
	}

	drawGraph (way) {

		let canvasElem = $("#" + this.thisId + "canvas");

		let g = new Graph();
		// добавляем узел с id "bebebe" и подписью "stand alone"
		// последний аргумент метода addNode - необязательный
		//g.addNode("bebebe", { label: "stand alone" });

		g.addNode(0 + "id", { label: "S", fill: this.render });

		for (let i=0;i<this.countP;i++) {
			g.addNode(parseInt(i+1) + "id", { label: "P" + parseInt(i + 1), fill: this.render});
		}
		for (let i=0;i<this.countC;i++) {
			g.addNode(parseInt(i+this.countP+1) + "id", { label: "C" + parseInt(i + 1), fill: this.render});
		}

		g.addNode(parseInt(1+this.countP+this.countC) + "id", { label: "T", fill: this.render});

 		// метод addEdge(a, b) создает ребро между узлами а и b
 		// если узлы a и b еще не созданы, они создадутся автоматически
 		let tmp1, tmp2, tmp3, tmp4, num;

 		let twoNodes = [], countEd=0;

 		for (let i=0;i<this.graphT.length;i++) {
 			for (let j=0;j<this.graphT[i].length;j++) {

 				tmp1 = this.graphT[i][j][1];
 				tmp2 = this.graphT[i][j][2];
 				num = this.graphT[i][j][0];

 				for (let k=0; k<this.graphT[num].length;k++) {
 					if (this.graphT[num][k][0] == i) {
 						tmp3 = this.graphT[num][k][1];
 						tmp4 = this.graphT[num][k][2];
 						break;
 					}
 				}

 				if (this.twoNodesF(twoNodes,i,num,countEd)) {
 					twoNodes[countEd] = new Array;
 					twoNodes[countEd][0] = i;
 					twoNodes[countEd][1] = num;
 					countEd++;

 					if (this.isCrorrectWay(i,num,way)) {
 						g.addEdge(i + "id", parseInt(this.graphT[i][j][0]) + "id", { 
   						//label: tmp1+"/"+tmp2+ " | "+tmp3+"/"+tmp4,
   						stroke: "#330000",
   						fill: "#330000"} ); 
 					} else {
 						g.addEdge(i + "id", parseInt(this.graphT[i][j][0]) + "id", { 
   						//label: tmp1+"/"+tmp2+ " | "+tmp3+"/"+tmp4,
   						stroke: "#d18c47",
   						fill: "#d18c47"} );
   					} 
 				}
				
 			}
 		}

 		// можно указать дополнительные свойства ребра

		// вычисляем расположение вершин перед выводом
		var layouter = new Graph.Layout.Spring(g);
		layouter.layout();

		// выводим граф
		var renderer = new Graph.Renderer.Raphael(this.thisId + 'canvas', g, 750, 400);
		renderer.draw();

		canvasElem.html();

		let graphElem = $("svg").last();

		graphElem.removeAttr("style");
		graphElem.attr("style='top: 800px; height: 450px; width: 800px;'");
		graphElem.attr("id='"+this.thisId+"graph'");
		graphElem.height(450);
		graphElem.width(750);
		canvasElem.html(graphElem);

		for (let i=0; i<this.graphT.length;i++) {

			$("ellipse").eq(i).removeAttr('fill-opacity');

			$("ellipse").eq(i).removeAttr('style');
			$("ellipse").eq(i).attr("style","stroke-width: 2; cursor: move;");
			$("ellipse").eq(i).attr("id",i + "g" +this.thisId);

			if (this.isCrorrectWayElipse($("ellipse").eq(i).attr("id"),way)) {
				$("ellipse").eq(i).removeAttr('stroke');
				$("ellipse").eq(i).attr('stroke','#330000');

				$("ellipse").eq(i).removeAttr('fill');
				$("ellipse").eq(i).attr('fill','#330000');
			} else {
				$("ellipse").eq(i).removeAttr('stroke');
				$("ellipse").eq(i).attr('stroke','#d18c47');

				$("ellipse").eq(i).removeAttr('fill');
				$("ellipse").eq(i).attr('fill','#d18c47');
			}


			$("text").eq(i).removeAttr('style');
			$("text").eq(i).attr("style","stroke-width: 2; cursor: move;");

			$("text").eq(i).removeAttr('fill');
			$("text").eq(i).attr('fill','#337199;');

			//$("text").eq(i).attr('fill-opacity',"0.5");

		}

		for (let i=this.graphT.length; i<this.graphT.length + this.countC + this.countP + (this.countC*this.countP);i++) {
			//$("text").eq(i).attr('fill-opacity',"0.5");
			//$("text").eq(i).attr('fill','#337199;');
		}

	}

	twoNodesIsConect (n1,n2,way) {
		for (var l = 0; l<way.length-1; l++) {
			if ((n1 == way[l+1]) && (n2 == way[l])) {
				return true;
			} else if ((n1 == way[l]) && (n2 == way[l+1])) {
				return true;
			}
			
		}
		return false;
	}

	twoNodesF (tN,n1,n2,countEd) {
		if (countEd !=0) {
			for (var l = 0; l<tN.length; l++) {
				if ((n1 == tN[l][0]) && (n2 == tN[l][1])) {
					return false;
				} else if ((n1 == tN[l][1]) && (n2 == tN[l][0])) {
					return false;
				}
			
			}
		}
		return true;
	}

	isCrorrectWay (n1,n2,way) {
		for (let i = 0; i<way.length-1;i++) {
			if ((n1 == way[i] && n2 == way[i+1]) || (n2 == way[i] && n1 == way[i+1])) {
				return true;
			}
		}

		return false;
	}

	isCrorrectWayElipse (id,way) {
		for (let m = 0; m<way.length;m++) {
			if (((id)==(way[m]+"g"+this.thisId))) {
				return true;
			}
		}

		return false;
	}

	changeTableColor (n,way) {
		for (let m = 0; m<way.length;m++) {
			if ((n==way[m])) {
				return true;
			}
		}

		return false;
	}

}

let allT = [];

function isV21(byCheckBox) {
	if (($("#new").val() == 0) && byCheckBox) {
		$("#new").val(1);

		$("#setP").val(3);
		$("#setC").val(4);
		return;
	} 
	if (($("#new").val() == 1) && !byCheckBox) {	
		$("#setP").val(3);
		$("#setC").val(4);
		return;
	} 
	if (($("#new").val() == 1) && byCheckBox) {	
		$("#new").val(0);
		$("#setP").val("");
		$("#setC").val("");
		return;
	}
}

function createNew() {
	allT.push(new GraphTransportation(parseInt($("#setP").val()),parseInt($("#setC").val()),parseInt($("#new").val())));
	allT[allT.length-1] = "undefined";
}

$("main").height("70%");
$("main").height($("main").height()- $("header").height);