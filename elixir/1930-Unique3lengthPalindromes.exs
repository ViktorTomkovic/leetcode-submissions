defmodule Solution do
  @spec count_palindromic_subsequence(s :: String.t()) :: integer
  def count_palindromic_subsequence(s) do
    split = s |> String.split("") |> Enum.filter(&(&1 != ""))
    {firstMap, lastMap} = precount(split)
    IO.inspect({firstMap, lastMap})

    count =
      firstMap
      |> Map.keys()
      |> Enum.reduce(0, fn letter, acc ->
        acc =
          acc +
            diffLetters(
              Enum.slice(
                split,
                Map.get(firstMap, letter) + 1,
                max(Map.get(lastMap, letter) - 1 - (Map.get(firstMap, letter)), 0)
              )
            )

        acc
      end)

    count
  end

  def precount(split, firstMap \\ Map.new(), lastMap \\ Map.new(), index \\ 0)

  def precount([], firstMap, lastMap, _) do
    {firstMap, lastMap}
  end

  def precount([head | tail], firstMap, lastMap, index) do
    firstMap = firstMap |> Map.put_new(head, index)
    lastMap = lastMap |> Map.put(head, index)
    precount(tail, firstMap, lastMap, index + 1)
  end

  def diffLetters(slice, diffSet \\ MapSet.new())
  def diffLetters([], diffSet), do: diffSet |> MapSet.size()
  def diffLetters([head | slice], diffSet), do: diffLetters(slice, diffSet |> MapSet.put(head))
end

s = "aabca"
# Output: 3
IO.inspect(Solution.count_palindromic_subsequence(s))

s = "adc"
# Output: 0
IO.inspect(Solution.count_palindromic_subsequence(s))

s = "bbcbaba"
# Output: 4
IO.inspect(Solution.count_palindromic_subsequence(s))
