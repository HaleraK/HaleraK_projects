function restart (difficult) {
	for (var i=0;i<9;i++) {
  	  for (var j=0;j<9;j++) {
  		var cell;
  		cell=document.getElementById('id' + i + j);
  		cell.removeAttribute("readonly");
  		cell.removeAttribute("style");
  		cell.getAttribute("maxlength");
  		cell.setAttribute("maxlength", 1); 
  		cell.getAttribute("style");
  		cell.setAttribute("style", "height: 25px; width: 25px; color: #808080; font-weight: bold;"); 
  		//cell.setAttribute("class", "colortext"); 			
  	  }
  	}
  
  var error_div=document.getElementById('error_div');
  error_div.innerHTML='';

  var sudoku_arr=[
    [1,2,3,4,5,6,7,8,9],
    [4,5,6,7,8,9,1,2,3],
    [7,8,9,1,2,3,4,5,6],

    [2,3,4,5,6,7,8,9,1],
    [5,6,7,8,9,1,2,3,4],
    [8,9,1,2,3,4,5,6,7],

    [3,4,5,6,7,8,9,1,2],
    [6,7,8,9,1,2,3,4,5],
    [9,1,2,3,4,5,6,7,8],
  ]; //базовая сетка

  var times_max,type_;
  times_max=Math.round(Math.random()*1000) +400;

  for (var k=0; k<times_max;k++) {
  	type_=Math.round(Math.random()*4);
  	switch (type_) {
  		case 0:{
  			sudoku_arr=swap_rows_inBlock(sudoku_arr);
  			break;
  		}
  		case 1:{
  			sudoku_arr=swap_colums_inBlock(sudoku_arr);
  			break;
  		}
  		case 2:{
  			sudoku_arr=swap_rows_blocks(sudoku_arr);
  			break;
  		}
  		case 3:{
  			sudoku_arr=swap_colums_blocks(sudoku_arr);
  			break;
  		}
  		case 4:{
  			sudoku_arr=transposing(sudoku_arr);
  			break;
  		}
  	}
  }

	var times_delet;

	switch (difficult) {
		case 0:{
			times_delet=Math.round(Math.random()*5) + 20;
			break;
		}
		case 1:{
			times_delet=Math.round(Math.random()*5) + 46;
			break;
		}
		case 2:{
			times_delet=Math.round(Math.random()*5) + 51;
			break;
		}
		case 3:{
			times_delet=Math.round(Math.random()*5) + 56;
			break;
		}
	}

	sudoku_arr=difficult_(sudoku_arr,times_delet);

	output_sudoku(sudoku_arr);

}

function transposing (sudoku_arr) {
	var save;
	for (var i=0;i<9;i++) {
		for (var j=0;j<9;j++) {
			save=sudoku_arr[i][j];
			sudoku_arr[i][j]=sudoku_arr[j][i];
			sudoku_arr[j][i]=save;
		}
	}
	return sudoku_arr;
}

function swap_rows_inBlock (sudoku_arr) {
	var block=Math.round(Math.random()*2) +1;
	var row1,row2;

	switch (block) {
		case 1: {
			do {
				row1=Math.round(Math.random()*2);
				row2=Math.round(Math.random()*2);
			} while (row1==row2);
			break;
		}

		case 2: {
			do {
				row1=Math.round(Math.random()*2)+3;
				row2=Math.round(Math.random()*2)+3;
			} while (row1==row2);
			break;
		}
		case 3: {
			do {
				row1=Math.round(Math.random()*2)+6;
				row2=Math.round(Math.random()*2)+6;
			} while (row1==row2);
			break;
		}

	}

	var save;
	for(var j=0;j<9;j++){
		save=sudoku_arr[row1][j];
		sudoku_arr[row1][j]=sudoku_arr[row2][j];
		sudoku_arr[row2][j]=save;
	}
	return sudoku_arr;
}

function swap_colums_inBlock (sudoku_arr) {
	var block=Math.round(Math.random()*2) +1;
	var colum1,colum2;

	switch (block) {
		case 1: {
			do {
				colum1=Math.round(Math.random()*2);
				colum2=Math.round(Math.random()*2);
			} while (colum1==colum2);
			break;
		}
		case 2: {
			do {
				colum1=Math.round(Math.random()*2)+3;
				colum2=Math.round(Math.random()*2)+3;
			} while (colum1==colum2);
			break;
		}
		case 3: {
			do {
				colum1=Math.round(Math.random()*2)+6;
				colum2=Math.round(Math.random()*2)+6;
			} while (colum1==colum2);
			break;
		}

	}

	var save;
	for(var i=0;i<9;i++){
		save=sudoku_arr[i][colum1];
		sudoku_arr[i][colum1]=sudoku_arr[i][colum2];
		sudoku_arr[i][colum2]=save;
	}
	return sudoku_arr;
}

function swap_rows_blocks (sudoku_arr) {
	var block1,block2;
	do {
		block1=Math.round(Math.random()*2);
		block2=Math.round(Math.random()*2);
	} while (block1==block2)
	
	switch (block1) {
		case 0: {
			block1=0;
			break;
		}
		case 1: {
			block1=3;
			break;
		}
		case 2: {
			block1=6;
			break;
		}
	}

	switch (block2) {
		case 0: {
			block2=0;
			break;
		}
		case 1: {
			block2=3;
			break;
		}
		case 2: {
			block2=6;
			break;
		}
	}

	var save;
	for (var k=0;k<3;k++){
		for (var j=0;j<9;j++){
			save=sudoku_arr[block1][j];
			sudoku_arr[block1][j]=sudoku_arr[block2][j];
			sudoku_arr[block2][j]=save;
		}
		block1++;
	  block2++;
  }

  return sudoku_arr;

}

function swap_colums_blocks (sudoku_arr) {
	var block1,block2;
	do {
		block1=Math.round(Math.random()*2);
		block2=Math.round(Math.random()*2);
	} while (block1==block2)
	
	switch (block1) {
		case 0: {
			block1=0;
			break;
		}
		case 1: {
			block1=3;
			break;
		}
		case 2: {
			block1=6;
			break;
		}
	}

	switch (block2) {
		case 0: {
			block2=0;
			break;
		}
		case 1: {
			block2=3;
			break;
		}
		case 2: {
			block2=6;
			break;
		}
	}

	var save;
	for (var k=0;k<3;k++){
		for (var i=0;i<9;i++){
			save=sudoku_arr[i][block1];
			sudoku_arr[i][block1]=sudoku_arr[i][block2];
			sudoku_arr[i][block2]=save;
		}
		block1++;
	  block2++;
  }

  return sudoku_arr;

}

function output_sudoku (sudoku_arr) {
	for (var i=0;i<9;i++) {
		for (var j=0;j<9;j++){
			cell=document.getElementById('id' + i + j);
			cell.value=sudoku_arr[i][j];
			if (sudoku_arr[i][j]!=0) {
				cell.getAttribute("readonly");
				cell.setAttribute("readonly","1");
				cell.getAttribute("style");
				cell.setAttribute("style", "color: #404040; font-weight: bold;height: 25px; width: 25px");
			}
		}
	}
 
}

function check (is_cell = 1) {
	hide_mistakes();
	var error_div=document.getElementById('error_div');
  	error_div.innerHTML='';

  	var hints= document.getElementById("mistake").value;

	var error_;
	error_=check_horizontal(hints);

	var but_mistake=document.getElementById("mistake");

	if (error_==0) {
		var error_div=document.getElementById('error_div');

		if (is_cell) {
  			error_div.innerHTML="Sudoku isn't solved correct";
  		}
	}

	error_= check_vertical(hints);

	if (error_==0) {
		var error_div=document.getElementById('error_div');
  		if (is_cell) {
  			error_div.innerHTML="Sudoku isn't solved correct";
  		}
	}

	if (is_cell == 0) {
  		check_3x3(1);
	}

	if (error_==1) {
		var error_div=document.getElementById('error_div');
  		error_div.innerHTML='Sudoku is solved correct';
	}
	
}

function check_horizontal (hints) {
	var check_arr = [];
	var arr_no_sort = [];
	var nums = [], error = 0;

	for (var i=0;i<9;i++) {
		nums = [];
		for (var j=0;j<9;j++){
			var cell = document.getElementById("id" + i + j);
  			check_arr[j]= cell.value;
		}

		arr_no_sort = check_arr;
		check_arr.sort();
		for (var k=0;k<8;k++) {
			if (check_arr[k]==check_arr[k+1]) {
  				error=1;
  				if (check_arr[k] != '' && hints) {
  					nums.push(check_arr[k]);
  				}
			}
		}

		for (var j=0;j<9;j++){
			var cell = document.getElementById("id" + i + j);
  			for (var k=0;k<nums.length;k++) {
  				if (cell.value == nums[k]) {
  					if (cell.hasAttribute("readonly")) {
  						cell.setAttribute("style", "color: #404040; font-weight: bold;height: 25px; width: 25px; text-decoration: underline;");
  					} else {
  						cell.setAttribute("style", "color: #ff531a; font-weight: bold;height: 25px; width: 25px");
  					}
  				}
  			}
		}
	}

	if (error == 1) {
		return 0;
	}
	return 1;
}

function check_vertical (hints) {
	var check_arr = [];
	var arr_no_sort = [];
	var nums = [], error = 0;

	for (var j=0;j<9;j++) {
		nums = [];
		for (var i=0;i<9;i++){
			var cell = document.getElementById("id" + i + j);
  			check_arr[i]= cell.value;


		}

		arr_no_sort = check_arr;
		check_arr.sort();
		for (var k=0;k<8;k++) {
			if (check_arr[k]==check_arr[k+1]) {
  				error=1;
  				if (check_arr[k] != '') {
  					nums.push(check_arr[k]);
  				}
			}
		}

		for (var i=0;i<9;i++){
			var cell = document.getElementById("id" + i + j);
  			for (var k=0;k<nums.length;k++) {
  				if (cell.value == nums[k] && hints) {
  					if (cell.hasAttribute("readonly")) {
  						cell.setAttribute("style", "color: #404040; font-weight: bold;height: 25px; width: 25px; text-decoration: underline;");
  					} else {
  						cell.setAttribute("style", "color: #ff531a; font-weight: bold;height: 25px; width: 25px");
  					}
  				}
  			}
		}
	}
	if (error == 1) {
		return 0;
	}
	return 1;
}



function check_3x3 (hints) {
	var arr = new Array(); 
	var nums = new Array(); 

	for( var i=1; i<10; i++ ) {
  		arr[i] = new Array();
  		nums[i] = new Array();
	}

	var group;

	for (var i=0;i<9;i++) {
		for (var j=0;j<9;j++) {

			var cell = document.getElementById("id" + i + j);
			group = cell.getAttribute("group_").charAt(1);

			for (var k=1;k<10;k++) {
				if (k == group) {
					arr[k].push(cell.value);
				}
			}

		}
	}

	for (var k=1;k<10;k++) {
		arr[k].sort();
	}

	for (var k=1;k<10;k++) {
		for (var j=0;j<8;j++) {
			if (arr[k][j]==arr[k][j+1]) {
  				error=1;
  				if (arr[k][j] != '') {
  					nums[k].push(arr[k][j]);
  				}
			}
		}
	}

	for (var i=0;i<9;i++) {
		for (var j=0;j<9;j++) {

			var cell = document.getElementById("id" + i + j);
  			for (var k=1;k<10;k++) {
  				for (var m=0;m<9;m++) {
  					if ((cell.getAttribute("group_").charAt(1) == k) && (cell.value == nums[k][m]) && hints) {
  						if (cell.hasAttribute("readonly")) {
  							cell.setAttribute("style", "color: #404040; font-weight: bold;height: 25px; width: 25px; text-decoration: underline;");
  						} else {
  							cell.setAttribute("style", "color: #ff531a; font-weight: bold;height: 25px; width: 25px");
  						}
  					}
  				}
  			}
		}
	}
}



function is_correct_num (cell_id) {

	if (document.getElementById("mistake").value == 1) {
		check(0);
	}

    var cell = document.getElementById(cell_id);
    num= cell.value;
 	
	var error_div=document.getElementById('error_div');
  	error_div.innerHTML='';

	var error_nan= +num;
	if (isNaN(error_nan)){
		cell.value='';
  	return;
	}		

	if (num==0){
		cell.value='';
  	return;
	}

}

function difficult_(sudoku_arr,times_delet) {
	var k=0;
	var i,j;
	while (k<times_delet) {
		i = Math.round(Math.random()*8);
		j = Math.round(Math.random()*8);

		if (sudoku_arr[i][j]!=0) {
			sudoku_arr[i][j]='';
			k++;
		}
	}
	return sudoku_arr;
}

function mistake() {
	if (document.getElementById("mistake").value==1) {
		document.getElementById("mistake").value=0;
		hide_mistakes();
	} else {
		document.getElementById("mistake").value=1;
		check(0);
	}
}

function hide_mistakes() {

	for (var i=0;i<9;i++) {
  	  for (var j=0;j<9;j++) {
  		var cell;
  		cell=document.getElementById('id' + i + j);
  		
  		if (cell.hasAttribute("readonly")) {
  			cell.setAttribute("style", "color: #404040; font-weight: bold;height: 25px; width: 25px");
  		} else {
  			cell.setAttribute("style", "height: 25px; width: 25px; color: #808080; font-weight: bold;"); 
  		}	
  	  }
  	}
}