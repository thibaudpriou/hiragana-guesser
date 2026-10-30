<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<path
	mask={`url(#${id}-mask-1)`}
	d="M129 292C165 343 182 394 212 448C219 460 233 470 247 465C272 455 279 426 276 402C271 369 240 327 163 275C134 255 115 271 129 292Z"
/>
<path
	mask={`url(#${id}-mask-2)`}
	d="M390 226C429 274 452 325 478 383C490 409 543 388 540 336C539 303 523 272 429 206C386 175 363 193 390 226Z"
/>
<path
	mask={`url(#${id}-mask-3)`}
	d="M783 196C719 195 754 250 742 297C721 379 595 618 395 802C310 880 322 906 410 841C610 694 732 529 834 363C847 340 855 322 878 310C925 288 825 196 783 196Z"
/>
<defs>
	<mask id={`${id}-mask-1`} style:--stroke-idx="0">
		<path pathLength="2000" d="M 141,281 248,456.2" />
	</mask>
	<mask id={`${id}-mask-2`} style:--stroke-idx="1">
		<path pathLength="2000" d="M 391,197 485,313 502,384" />
	</mask>
	<mask id={`${id}-mask-3`} style:--stroke-idx="2">
		<path pathLength="2000" d="M 768,206 822,280 625,625 351,865.8" />
	</mask>
</defs>
