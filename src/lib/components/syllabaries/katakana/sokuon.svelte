<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<path
	mask={`url(#${id}-mask-1)`}
	d="M205 404C234 445 247 486 271 529C276 538 288 547 299 542C319 535 325 512 322 492C319 466 294 432 232 391C209 375 193 388 205 404Z"
/>
<path
	mask={`url(#${id}-mask-2)`}
	d="M413 352C445 390 463 431 484 477C493 498 536 481 534 440C532 413 520 388 445 336C410 311 392 325 413 352Z"
/>
<path
	mask={`url(#${id}-mask-3)`}
	d="M728 327C677 326 705 371 695 409C678 474 578 665 418 812C349 875 359 896 429 844C590 726 687 594 768 461C779 443 785 428 804 419C842 401 761 328 728 327Z"
/>
<defs>
	<mask id={`${id}-mask-1`} style:--stroke-idx="0">
		<path pathLength="2000" d="M 214,396 300,535" />
	</mask>
	<mask id={`${id}-mask-2`} style:--stroke-idx="1">
		<path pathLength="2000" d="M 414,328 489,421 503,478" />
	</mask>
	<mask id={`${id}-mask-3`} style:--stroke-idx="2">
		<path pathLength="2000" d="M 716,335 759,395 602,671 383,863" />
	</mask>
</defs>
