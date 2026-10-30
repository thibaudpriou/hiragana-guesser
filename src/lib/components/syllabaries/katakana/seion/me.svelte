<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<path
	mask={`url(#${id}-mask-1)`}
	d="M682 193C684 263 634 343 615 377C598 407 497 579 275 787C159 896 198 898 293 830C506 676 659 455 686 417C730 354 761 303 811 251C831 230 791 198 764 180C744 167 680 121 682 193Z"
/>
<path
	mask={`url(#${id}-mask-2)`}
	d="M411 398C360 371 348 382 389 423C458 491 594 620 620 653C643 681 697 727 722 687C738 660 708 615 678 588C644 558 507 450 411 398Z"
/>
<defs>
	<mask id={`${id}-mask-1`} style:--stroke-idx="0">
		<path pathLength="2000" d="M 706,166 751,246 470,655 222,862" />
	</mask>
	<mask id={`${id}-mask-2`} style:--stroke-idx="1">
		<path pathLength="2000" d="M 379,395 656,601 701,692" />
	</mask>
</defs>
