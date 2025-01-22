defmodule Solution do
  @spec can_construct(s :: String.t(), k :: integer) :: boolean
  def can_construct(s, k) do
    len = String.length(s)

    cond do
      k > len ->
        false

      k == len ->
        true

      k < len ->
        s
        |> String.to_charlist()
        |> Enum.frequencies()
        |> Map.values()
        |> Enum.filter(&(Integer.mod(&1, 2) == 1))
        |> Enum.count()
        |> then(&(&1 <= k))
    end
  end
end

ExUnit.start()

defmodule LeetTest do
  # {_, largeInput1} = Code.eval_file("./3045-LargeInput1.exs")

  use ExUnit.Case,
    async: true,
    parameterize: [
      %{s: "annabelle", k: 2, output: true},
      %{s: "leetcode", k: 3, output: false},
      %{s: "true", k: 4, output: true}
      # %{words: largeInput1[:words], output: largeInput1[:output]}
    ]

  test "leet", %{s: s, k: k, output: output} do
    solution = Solution.can_construct(s, k)

    assert solution == output
  end
end
