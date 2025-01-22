defmodule Solution do
  @spec xor_all_nums(nums1 :: [integer], nums2 :: [integer]) :: integer
  def xor_all_nums(nums1, nums2) do
    xor = 0

    xor =
      if Integer.mod(length(nums2), 2) == 1,
        do: Enum.reduce(nums1, xor, &Bitwise.bxor(&1, &2)),
        else: xor

    xor =
      if Integer.mod(length(nums1), 2) == 1,
        do: Enum.reduce(nums2, xor, &Bitwise.bxor(&1, &2)),
        else: xor

    xor
  end
end

ExUnit.start()

defmodule LeetTests do
  use ExUnit.Case,
    async: true,
    parameterize: [
      %{nums1: [2, 1, 3], nums2: [10, 2, 5, 0], output: 13},
      %{nums1: [2, 1], nums2: [3, 4], output: 0}
    ]

  test "leet", %{nums1: nums1, nums2: nums2, output: output} do
    assert Solution.xor_all_nums(nums1, nums2) == output
  end
end
