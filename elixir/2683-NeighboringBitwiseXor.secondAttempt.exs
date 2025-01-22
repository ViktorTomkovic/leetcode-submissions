defmodule Solution do
@spec does_valid_array_exist(derived :: [integer]) :: boolean
def does_valid_array_exist(derived) do
    # This form &decode is for some reason faster than &Bitwise.bxor...
  1 == derived |> Enum.reduce(1, &decode/2)
end
def decode(elem, acc), do: Bitwise.bxor(elem, acc)
end
ExUnit.start()

defmodule LeetTests do
  use ExUnit.Case,
    async: false,
    parameterize: [
      %{nums1: [1, 1, 0], output: true},
      %{nums1: [1, 1], output: true},
      %{nums1: [1, 0], output: false}
    ]

  test "leet", %{nums1: nums1, output: output} do
    assert Solution.does_valid_array_exist(nums1) == output
  end
end
