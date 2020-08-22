<template>
	<sui-menu borderless>
		<a href="https://xaander1.github.io/sitemaphub/" is="sui-menu-item" link name="Home">
			<sui-image :src="require('@/assets/logo.png')" size="small"/>
		</a>
		<sui-menu-menu position="right">
			<a href="https://github.com/xaander1/sitemaphub" target="_blank" is="sui-menu-item" link name="Home">
				<sui-icon color="green" size="large" name="github"/> View Project
			</a>
		</sui-menu-menu>
	</sui-menu>
</template>