defmodule Solution do
  @spec does_valid_array_exist(derived :: [integer]) :: boolean
  def does_valid_array_exist(derived) do
    one = derived |> Enum.reduce([1], &decode/2) |> tl() |> Enum.reverse() |> IO.inspect()
    zer = derived |> Enum.reduce([0], &decode/2) |> tl() |> Enum.reverse() |> IO.inspect()
    oneDoubleDerived = one |> encode({hd(one),[]})
    zerDoubleDerived = zer |> encode({hd(zer),[]})
    derived == oneDoubleDerived || derived == zerDoubleDerived
  end
  def decode(elem, acc), do: [Bitwise.bxor(elem, hd(acc)) | acc]
  def encode([only], {ff, acc}), do: [Bitwise.bxor(only, ff) | acc] |> Enum.reverse()
  def encode([first, second | rest], {ff, acc}), do: encode([second | rest], {ff, [Bitwise.bxor(first, second) | acc]})
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
