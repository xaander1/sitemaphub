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
				<textarea rows="8"></textarea>
			</sui-form-field>
			<sui-header dividing>Select Category Of Sitemap</sui-header>
			<sui-form-fields equal-width>
				<sui-form-field>
					<sui-checkbox toggle label="Generalstores" />
				</sui-form-field>
				<sui-form-field>
					<sui-checkbox toggle label="Electronics" />
				</sui-form-field>
				<sui-form-field>
					<sui-checkbox toggle label="Supermarkets" />
				</sui-form-field>
				<sui-form-field>
					<sui-checkbox toggle label="Fashion" />
				</sui-form-field>
				<sui-form-field>
					<sui-checkbox toggle label="Appliances" />
				</sui-form-field>
			</sui-form-fields>
		</sui-form>	

		
	</sui-container>
</template>
<script>
	import axios from 'axios'
	import cheerio from 'cheerio'
	export default {
		data(){
			return {
				sitemapUrl:"https://www.chekiprice.co.ke/sitemap.xml",
				existing:null
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
					//replace
					this.existing = sitemapUrls.map(url=>{
						return (url.replace('https://www.chekiprice.co.ke/','').replace('generalstores/','').replace('electronics/','').replace('allstores/','').replace('supermarkets/','').replace('appliances/','').replace('fashion/','').replace('custom/','').replace('terms-of-use','').replace('privacy-policy','').split('+').join(' '))
					}).filter(item=>item)
				})
			}
		}

	}
</script>