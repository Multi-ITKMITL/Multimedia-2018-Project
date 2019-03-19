let game = [];
function ren(g){
	let template = `<box col="" mob="" class=""><inner class="bg-smoke shadow-solid round game-wrap">
	<div class="blank bg-black game-pic" ratio="16:9" style="background-image:url('${g.index}.jpg')"></div>
	<div class="padding">
	<h2 class="t-center cl-ci1 t-shadow">
	${g.name}
	</h2>
	<sp class="s"></sp>
	<p class="cl-ci3 size-m ffont">
	${g.caption}
	</p>
	<sp class=""></sp>
	<theboxes boxing="2" mob="" class="top ffont spacing -clip">
	<box col="" mob="" class=""><inner class="">
	<a href="about.html?id=${g.index}" class="btn wide t-center">About</a>
	</inner></box>
	<box col="" mob="" class=""><inner class="">
	<a href="${g.url}" class="btn wide t-center">Play</a>
	</inner></box>
	</theboxes>
	</div>
	</inner></box>`;
	return template;
}

function render_game(){
	for (var i = 0 in game) {
		document.write(ren(game[i]));
	}
}