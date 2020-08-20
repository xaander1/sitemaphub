<template>
	<sui-container text-align="center">
		<div class="ui icon small input focus fluid olive">
			<input class="prompt olive" @keyup.enter="getSitemap" v-model="url" type="text" placeholder="Enter Sitemap URL...">
			<i class="inverted circular sitemap link icon olive" v-on:click="getSitemap"></i>
		</div>
	</sui-container>
</template>
<script>
	export default {
		data(){
			return {
				url:"",
				res:""
			}
		},
		methods : {
			getSitemap(){
				this.$request('http://www.google.com', function (error, response, body) {
				console.error('error:', error); // Print the error if one occurred
				console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
				console.log('body:', body); // Print the HTML for the Google homepage.
			})
			}
		}

	}
</script>