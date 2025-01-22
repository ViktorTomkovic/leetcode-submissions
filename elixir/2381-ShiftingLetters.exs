defmodule Solution do
  @spec shifting_letters(s :: String.t(), shifts :: [[integer]]) :: String.t()
  def shifting_letters(s, shifts) do
    len = String.length(s)

    prefixMap =
      shifts
      |> Enum.reduce(Map.new(), fn
        [left, right, 0], shiftMap ->
          shiftMap
          |> Map.update(left, -1, &(&1 - 1))
          |> Map.update(right + 1, +1, &(&1 + 1))

        [left, right, 1], shiftMap ->
          shiftMap
          |> Map.update(left, +1, &(&1 + 1))
          |> Map.update(right + 1, -1, &(&1 - 1))
      end)

    change(s, prefixMap, len, len, 0, "")
  end

  def change("", _, 0, _, _, currentS) do
    currentS
  end

  def change(<<char::utf8>> <> rest, shiftMap, remaining, totalLength, currentSum, currentS) do
    index = totalLength - remaining
    currentSum = currentSum + Map.get(shiftMap, index, 0)
    # IO.inspect({char, currentSum})
    newChar = Integer.mod(char + currentSum - ?a, 26) + 97
    currentS = currentS <> <<newChar::utf8>>
    change(rest, shiftMap, remaining - 1, totalLength, currentSum, currentS)
  end
end

s = "abcz"
shifts = [[0, 1, 0], [1, 2, 1], [0, 2, 1]]
# Output: "ace"
IO.inspect(Solution.shifting_letters(s, shifts))

s = "dztz"
shifts = [[0, 0, 0], [1, 1, 1]]
# Output: "catz"
IO.inspect(Solution.shifting_letters(s, shifts))
# inspect("héllo", binaries: :as_binaries)
