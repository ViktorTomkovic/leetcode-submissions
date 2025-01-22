defmodule Solution do
  @spec find_the_prefix_common_array(a :: [integer], b :: [integer]) :: [integer]
  def find_the_prefix_common_array(a, b) do
    Enum.zip(a, b)
    |> Enum.reduce({[], MapSet.new(), MapSet.new()}, fn {a, b}, {output, sa, sb} ->
      sa = sa |> MapSet.put(a)
      sb = sb |> MapSet.put(b)
      output = [MapSet.intersection(sa, sb) |> MapSet.size() | output]
      {output, sa, sb}
    end)
    |> elem(0)
    |> Enum.reverse()
  end
end

ExUnit.start()

defmodule Leet do
  use ExUnit.Case,
    async: true,
    parameterize: [
      %{a: [1, 3, 2, 4], b: [3, 1, 2, 4], output: [0, 2, 3, 4]},
      %{a: [2, 3, 1], b: [3, 1, 2], output: [0, 1, 3]}
    ]

  test "leet", %{a: a, b: b, output: output} do
    assert Solution.find_the_prefix_common_array(a, b) == output
  end
end
