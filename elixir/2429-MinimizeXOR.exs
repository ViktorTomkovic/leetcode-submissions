defmodule Solution do
  @spec minimize_xor(num1 :: integer, num2 :: integer) :: integer
  def minimize_xor(num1, num2) do
    countOnes = num2 |> Integer.digits(2) |> Enum.count(&(&1 == 1))
    {remaining, base} = firstPass(num1 |> Integer.digits(2), countOnes, []) |> IO.inspect()

    secondPass(base, remaining, [])
      |> IO.inspect()
    |> Integer.undigits(2)
  end

  def firstPass([], remaining, acc), do: {remaining, acc}
  def firstPass([d | num1], 0, acc), do: firstPass(num1, 0, [0 | acc])
  def firstPass([0 | num1], remaining, acc), do: firstPass(num1, remaining, [0 | acc])
  def firstPass([1 | num1], remaining, acc), do: firstPass(num1, remaining - 1, [1 | acc])

  def secondPass([], 0, acc), do: acc
  def secondPass([], remaining, acc), do: secondPass([], remaining - 1, [1 | acc])
  def secondPass([d | rest], 0, acc), do: secondPass(rest, 0, [d | acc])
  def secondPass([0 | rest], remaining, acc), do: secondPass(rest, remaining - 1, [1 | acc])
  def secondPass([1 | rest], remaining, acc), do: secondPass(rest, remaining, [1 | acc])
end

ExUnit.start()

defmodule LeetTest do
  use ExUnit.Case,
    async: true,
    parameterize: [
      %{num1: 0b100100, num2: 0b1111100000, output: 0b101111},
      %{num1: 3, num2: 5, output: 3},
      %{num1: 1, num2: 12, output: 3},
      %{num1: 25, num2: 72, output: 24},
      %{num1: 0b11001, num2: 0b1001000, output: 0b11000},
    ]

  test "leet", %{num1: num1, num2: num2, output: output} do
    assert Solution.minimize_xor(num1, num2) == output
  end
end
