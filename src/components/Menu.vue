<template>
	<sui-menu borderless>
		<a href="/" is="sui-menu-item" link name="Home">
			<sui-image :src="require('@/assets/logo.png')" size="small"/>
		</a>
		<sui-menu-menu position="right">
			<a href="https://gitlab.com/xaander1/sitemaphub" target="_blank" is="sui-menu-item" link name="Home">
				<sui-icon color="orange" name="gitlab"/> View Project
			</a>
		</sui-menu-menu>
	</sui-menu>
</template>