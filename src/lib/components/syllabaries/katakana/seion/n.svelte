<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<path
	mask={`url(#${id}-mask-1)`}
	d="M242 221C296 273 327 325 384 373C414 399 455 375 440 335C413 268 317 218 252 183C158 130 214 193 242 221Z"
/>
<path
	mask={`url(#${id}-mask-2)`}
	d="M769 315C646 461 524 610 359 710C313 737 273 750 222 759C175 768 233 816 253 836C272 855 304 880 330 857C507 702 663 551 785 338C818 282 796 282 769 315Z"
/>
<defs>
	<mask id={`${id}-mask-1`} style:--stroke-idx="0">
		<path pathLength="2000" d="M 214,175 422,379" />
	</mask>
	<mask id={`${id}-mask-2`} style:--stroke-idx="1">
		<path pathLength="2000" d="M 227,776 306,814 538,631 791,308" />
	</mask>
</defs>
