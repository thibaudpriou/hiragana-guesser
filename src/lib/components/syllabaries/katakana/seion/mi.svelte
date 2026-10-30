<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<path
	mask={`url(#${id}-mask-1)`}
	d="M403 172C472 221 537 288 596 308C636 322 638 263 619 235C598 202 483 163 414 138C373 124 314 108 403 172Z"
/>
<path
	mask={`url(#${id}-mask-2)`}
	d="M387 430C454 476 531 562 597 584C639 598 633 524 609 499C576 465 477 430 402 404C354 386 328 389 387 430Z"
/>
<path
	mask={`url(#${id}-mask-3)`}
	d="M371 697C441 750 543 854 619 895C665 920 672 835 643 802C604 757 502 714 368 652C332 636 298 642 342 676C361 690 361 690 371 697Z"
/>
<defs>
	<mask id={`${id}-mask-1`} style:--stroke-idx="0">
		<path pathLength="2000" d="M 367,134 576,243 607,302" />
	</mask>
	<mask id={`${id}-mask-2`} style:--stroke-idx="1">
		<path pathLength="2000" d="M 367,404 577,504 609,580" />
	</mask>
	<mask id={`${id}-mask-3`} style:--stroke-idx="2">
		<path pathLength="2000" d="M 331,655 619,827 638,887" />
	</mask>
</defs>
