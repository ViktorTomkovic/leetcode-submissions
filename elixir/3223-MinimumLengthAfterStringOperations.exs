defmodule Solution do
  @spec minimum_length(s :: String.t()) :: integer
  def minimum_length(s) do
    s
    |> asdf(Map.new())
  end

  def asdf("", counts), do: counts |> Map.values() |> Enum.sum()

  def asdf(<<char, rest::binary>>, counts) do
    counts =
      counts
      |> Map.update(char, 1, &(3-&1))
      # |> Map.update(char, 1, fn
      #   1 -> 2
      #   2 -> 1
      # end)

    asdf(rest, counts)
  end
end

defmodule SolutionFirst do
  @spec minimum_length(s :: String.t()) :: integer
  def minimum_length(s) do
    s
    |> String.to_charlist()
    |> Enum.frequencies()
    |> Map.values()
    |> Enum.map(&(2 - Integer.mod(&1, 2)))
    |> Enum.sum()
  end
end

ExUnit.start()

defmodule LeetTests do
  use ExUnit.Case,
    async: true,
    parameterize: [
      %{s: "abaacbcbb", output: 5},
      %{s: "aa", output: 2}
    ]

  test "leet", %{s: s, output: output} do
    assert Solution.minimum_length(s) == output
  end
end
