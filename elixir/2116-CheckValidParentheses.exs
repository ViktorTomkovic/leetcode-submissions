defmodule Solution do
  @spec can_be_valid(s :: String.t(), locked :: String.t()) :: boolean
  def can_be_valid(s, locked) do
    isValid(s, locked)
  end

  def isValid(s, locked, stackLeft \\ 0, stackRight \\ 0, count \\ 0)

  def isValid("", "", left, right, count) do
    left == 0 && right >= 0 && Integer.mod(count, 2) == 0
  end

  def isValid(_, _, _, -1, _), do: false

  def isValid(<<_, s::binary>>, <<"0" <> locked::binary>>, left, right, count) do
    left = max(left - 1, 0)
    right = right + 1
    isValid(s, locked, left, right, count + 1)
  end

  def isValid(<<"(", s::binary>>, <<"1" <> locked::binary>>, left, right, count) do
    left = left + 1
    right = right + 1
    isValid(s, locked, left, right, count + 1)
  end

  def isValid(<<")", s::binary>>, <<"1" <> locked::binary>>, left, right, count) do
    left = max(left - 1, 0)
    right = right - 1
    isValid(s, locked, left, right, count + 1)
  end
end

ExUnit.start()

defmodule LeetTest do
  use ExUnit.Case,
    async: true,
    parameterize: [
      %{s: "))()))", locked: "010100", output: true},
      %{s: "()()", locked: "0000", output: true},
      %{s: ")", locked: "0", output: false},
      %{s: "((()))))", locked: "00011011", output: true},
      %{s: "())(()()()", locked: "0001101000", output: true},
      %{s: "())(()()", locked: "00011010", output: false}
    ]

  test "leet", %{s: s, locked: locked, output: output} do
    assert Solution.can_be_valid(s, locked) == output
  end
end
