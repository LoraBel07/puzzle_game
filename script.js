$(document).ready(function(){

	pieces = createPieces(true);

	$("#puzzleContainer").html(pieces);
	$("#btnStart").click(function() {
		let pieces = $("#puzzleContainer div");
			pieces.each(function(){
				let leftPosition = 
				Math.floor(Math.random()*290) + "px";
				let topPosition = 
				Math.floor(Math.random()*290) + "px";

				$(this).addClass("draggablePiece").css({
					position:"absolute",
					left: leftPosition,
					top: topPosition
				}) //end $(this).addClass

				$("#pieceContainer").append($(this));
			}); //end to pieces.each(function())

			let emptyString = createPieces(false); //let (было pieces) ошибка???

			$("#puzzleContainer").html(emptyString); //emptyString / pieces ???
			$(this).hide();
			$("#btnReset").show();
			implementLogic()
	})  //end $("btnStart").click(function())

	$("#btnReset").click(function() {
		let newPieces = createPieces(true);
		$("#puzzleContainer").html(newPieces);
		$("#piecesContainer").html("");
		$(this).hide();
		$("#btnStart").show();
	})  //end $("#btnReset").click(function())

	function createPieces(withImage) {

				let rows = 4, columns = 4;
				let pieces = "";

				for (let i = 0,top=0,order=0;i<rows;i++,top-=100) {
					for (let j=0,left=0;j<columns;j++,left-=100,order++) {
						if(withImage) {
							pieces += "<div style='background-position:" 
							+ left + "px " + top + "px;' class='piece' data-order=" + order + "></div>";
							// console.log(pieces);
							} // end if(withImage)
							else {
							pieces += "<div style='background-image:none;' class='pieceHolder droppableSpace'></div>";
							}
						} // end j loop
					} // end walk grid (i,j) for image pieces

				return pieces;
			}   // end createPieces(withImage)

			function checkIfPuzzleSolved() {

				if($("#puzzleContainer .droppedPiece").length != 16){
					// console.log("not full: " + $("#puzzleContainer .droppedPiece").length );
					return false;
				}
				for (let k=0; k<16; k++) {

						let item = $("#puzzleContainer .droppedPiece:eq(" + k + ")");
						let order = item.data("order");
						// console.log("order: " + order); // + order
						// console.log("K: " + k);

						if(k != order) {
							$("#piecesContainer").text("Ouch! Try Again!");
							return false;
						} 
				}
				$("#piecesContainer").text("Wow! You are a GENIUS!");
				return true;

			} // end checkIfPuzzleSolved()


			function implementLogic() {

				$(".draggablePiece").draggable({
					revert:"invalid",
					start:function() {
						if($(this).hasClass("droppedPiece")) {
							$(this).removeClass("droppedPiece");
							$(this).parent().removeClass("piecePresent");
						}
					}
					});
				$(".droppableSpace").droppable({
					hoverClass:"ui-state-highlight",
					accept:function(){
						return !$(this).hasClass("piecePresent") 
					},
					drop:function (event, ui) {

						let draggableElement = ui.draggable;
						let droppedOn = $(this);

						droppedOn.addClass("piecePresent");
						$(draggableElement).addClass("droppedPiece").css({
							top:0,
							left:0,
							position:"relative"
						}).appendTo(droppedOn);
						checkIfPuzzleSolved(); 
					} // end of drop:function
				}); // end $(".droppableSpace").droppable
			}  // end implementLogic()
	}); // end  $(document).ready(function()

