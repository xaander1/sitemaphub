<template>
	<sui-container>

		<div v-if="!existing" class="ui icon small input focus fluid olive">
			<input class="prompt olive" @keyup.enter="getSitemap" v-model="sitemapUrl" type="text" placeholder="Enter Sitemap URL...">
			<i class="inverted circular sitemap link icon olive" v-on:click="getSitemap"></i>
		</div>
		<sui-form v-else>
			<sui-divider hidden />
			<sui-form-field>
				<label>Enter Keywords Separated By Comma's</label>
				<textarea v-model="userInput" rows="5"></textarea>
			</sui-form-field>
			<sui-header dividing>Select Category Of Sitemap</sui-header>
			<sui-form-fields equal-width>
				<sui-form-field>
					<sui-checkbox v-model="checkbox.generalstores" toggle label="Generalstores" />
				</sui-form-field>
				<sui-form-field>
					<sui-checkbox v-model="checkbox.electronics" toggle label="Electronics" />
				</sui-form-field>
				<sui-form-field>
					<sui-checkbox v-model="checkbox.supermarkets" toggle label="Supermarkets" />
				</sui-form-field>
				<sui-form-field>
					<sui-checkbox v-model="checkbox.fashion" toggle label="Fashion" />
				</sui-form-field>
				<sui-form-field>
					<sui-checkbox v-model="checkbox.appliances" toggle label="Appliances" />
				</sui-form-field>
			</sui-form-fields>
			<sui-divider hidden />
			<sui-button @click.prevent="generateSitemaps" color="olive" content="Generate Sitemap" float="right" />
		</sui-form>	
		<sui-message v-if="message" inverted color="olive">
			<sui-button 
			size="mini" 
			:content="copyStatus?'Copied':'Copy'" 
			float="right" 
			:icon="copyStatus?'check circle':'copy'" 
			:color="copyStatus?'green':'olive'"
			v-clipboard:copy="message"
			@click="handleCopyStatus"
			compact/>
			<pre>
				{{message}}
			</pre>
		</sui-message>
	</sui-container>
</template>
<script>
	import axios from 'axios'
	import cheerio from 'cheerio'
	export default {
		data(){
			return {
				sitemapUrl:"https://www.chekiprice.co.ke/sitemap.xml",
				existing:null,
				checkbox:{
					'generalstores':false,
					'electronics':false,
					'supermarkets':false,
					'fashion':false,
					'appliances':false
				},
				userInput:null,
				copyStatus:false,
				message:'',
				date:(new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear())
			}
		},
		methods : {
			getSitemap(){
				axios.get(this.sitemapUrl, {
					"Content-Type": "application/xml; charset=utf-8"
				})
				.then(response => {
					const $ = cheerio.load(response.data)
					const sitemapUrls= [];

					$('url loc').each(function(i) {
						sitemapUrls[i] = $(this).text();
					});
					//replace and get keywords
					this.existing = sitemapUrls.map(url=>{
						return (url.replace('https://www.chekiprice.co.ke/','').replace('generalstores/','').replace('electronics/','').replace('allstores/','').replace('supermarkets/','').replace('appliances/','').replace('fashion/','').replace('custom/','').replace('terms-of-use','').replace('privacy-policy','').split('+').join(' '))
					}).filter(item=>item)
				})
			},
			generateSitemaps(){
				this.message=''
				this.copyStatus=false
				if(this.userInput){
					let products = this.userInput.split(',')
					products.forEach(item=>{
						//check if in array
						if(!this.existing.includes(item)){
							let newItem=item.split(" ").join('+')
							//loop checkboxes
							for(let key in this.checkbox){
								if(this.checkbox[key]){
									let msg=`
<url>
  <loc>
    https://www.chekiprice.co.ke/${key}/${newItem}
  </loc>
  <lastmod>${this.date}</lastmod>
  <priority>0.5</priority>
</url>`
									this.message=this.message+msg
								}
							}
						}
					})
				}
			},
			handleCopyStatus(){
				this.copyStatus=true
			}
		}

	}
</script>