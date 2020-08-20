<template>
	<sui-container text-align="center">
		<div class="ui icon small input focus fluid olive">
				<input class="prompt olive" @keyup.enter="submit" v-model="submit" type="text" placeholder="Enter Sitemap URL...">
				<i class="inverted circular sitemap link icon olive" v-on:click="searchItem"></i>
			</div>
	</sui-container>
</template>