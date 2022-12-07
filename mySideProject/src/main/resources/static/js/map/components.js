let tr_component = {
    template:`
<tr>
    <th scope="row">{{text}}</th>
    <td v-if="classname == ''">{{propsdata}}</td>
    <td v-else v-bind:class="classname">{{propsdata}}</td>
</tr>
   		`,
    props:['propsdata', 'text', 'classname'],
    data: function(){
    	return{}
    }
    
};


let tr_input_component = {
	template:`
<tr>
	<th scope="row">{{text}}</th>
	<td>
		<input type="text" v-bind:value="propsdata"  placeholder="여기를 눌러 입력하십시오" readonly/>
	</td>
</tr>
		`,
	props:['propsdata','text'],
	data: function(){
		return {}
	}
};

let tr_mapcheckbox_component = {
	template:`
<tr v-on:click="document.getElementById(id_value).click()">
	<th>{{text}}</th>
	<td>
		<label class="chkbx">
			<input v-if="propsdata == id_value" checked="checked" type="checkbox" onclick="checkOnlyOne(this)" v-bind:id="id_value" name="checkBoxMap" v-bind:value="id_value"/>
			<input v-else type="checkbox" v-bind:onclick="onclick_name" v-bind:id="id_value" v-bind:name="name" v-bind:value="id_value"/>
			<span class="checkmark"></span>
		</label>	
	</td>
</tr>	
	`,
	props:['propsdata', 'text', 'id_value', 'name', 'onclick_name'],
	data: function(){
		return {}
	}
}

let li_img_component = {
		template:`
		<li v-bind:onclick="onclickname" v-bind:id="idname">
			<a>
				<img v-bind:src="srcname" v-bind:alt="altname"/>
				{{text}}
			</a>
		</li>
		`,
		props:['text', 'srcname','altname', 'onclickname', 'idname'],
		data: function(){
			return {}
		}
}


let opert_photo = {
		template:`
		<img v-bind:src="uploadPhoto/cvpl_rcept_no/photoKind/src"/></div>
		`,
		props:['src'],
		data:function(){
			return{}
		}
}




