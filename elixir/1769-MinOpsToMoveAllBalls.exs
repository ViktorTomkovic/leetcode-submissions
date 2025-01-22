defmodule Solution do
  @spec min_operations(boxes :: String.t()) :: [integer]
  def min_operations(boxes) do
    len = boxes |> String.length()

    for index <- 0..(len - 1) do
      Enum.reduce(0..(len - 1), 0, fn j, acc ->
        value = boxes |> :binary.at(j) |> then(&(&1 - ?0))
        # value = boxes |> String.at(j) |> String.to_integer()
        distance = abs(index - j)
        acc + value * distance
      end)
    end
  end
end

# boxes = "110"
# Output: [1,1,3]
# IO.inspect(Solution.min_operations(boxes))
# boxes = "001011"
# Output: [11,8,5,4,3,4]
# IO.inspect(Solution.min_operations(boxes))

ExUnit.start()

defmodule LeetTest do
  # large1 = File.read("1769-LargeInput.in1") |> elem(1) |> String.trim()
  # largeExp1 = File.stream!("1769-LargeInput.out1", [:read], 8192) |> Stream.map(&String.trim/1) |> Enum.join() |> Code.eval_string() |> elem(0)
  {_, largeInput1} = Code.eval_file("./1769-LargeInput1.exs")
  use ExUnit.Case,
    async: true,
    parameterize: [
      %{boxes: "110", output: [1, 1, 3]},
      %{boxes: "001011", output: [11, 8, 5, 4, 3, 4]},
      %{boxes: largeInput1[:boxes], output: largeInput1[:output]}
    ]

  test "leet", %{boxes: boxes, output: output} do
    assert Solution.min_operations(boxes) == output
  end
end
