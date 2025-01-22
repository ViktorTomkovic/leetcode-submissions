defmodule Solution do
  @spec max_k_divisible_components(
          n :: integer,
          edges :: [[integer]],
          values :: [integer],
          k :: integer
        ) :: integer
  def max_k_divisible_components(n, edges, values, k) do
    valuesMap =
      Enum.to_list(0..(n - 1))
      |> Enum.zip(values)
      |> Map.new()

    edgesMap = Enum.to_list(0..(n - 1)) |> Enum.reduce(Map.new(), fn e, acc -> Map.put(acc, e, []) end)

    edgesMap =
      Enum.reduce(edges, edgesMap, fn edge, acc ->
        [from, to] = edge
        acc = Map.update(acc, from, [to], fn existing -> [to | existing] end)
        acc = Map.update(acc, to, [from], fn existing -> [from | existing] end)
      end)

    # IO.inspect(valuesMap)
    # IO.inspect(edgesMap)

    markedNodes = solveForSubtree(0, 0, edgesMap, valuesMap, k)
    markedNodes.marked
  end

  def solveForSubtree(nodeIndex, comingFrom, edgesMap, valuesMap, k) do
    IO.inspect(Map.get(edgesMap, nodeIndex))
    children = Map.get(edgesMap, nodeIndex) |> Enum.filter(&(&1 != comingFrom))

    # IO.puts("visited")
    # IO.inspect(nodeIndex)
    # IO.inspect(children)

    solvedChildren =
      Enum.reduce(children, %{sum: 0, marked: 0}, fn child, acc ->
        solvedChild = solveForSubtree(child, nodeIndex, edgesMap, valuesMap, k)
        %{sum: acc.sum + solvedChild.sum, marked: acc.marked + solvedChild.marked}
      end)

    # IO.puts("solved")
    # IO.inspect(solvedChildren)

    remainder = Integer.mod(solvedChildren.sum + Map.get(valuesMap, nodeIndex), k)
    # IO.inspect(Map.get(valuesMap, nodeIndex))
    # IO.inspect(remainder)

    # case remainder do
    #   0 ->
    #     %{sum: 0, marked: [nodeIndex | solvedChildren.marked]}
    #
    #   _ ->
    #     %{sum: Map.get(valuesMap, nodeIndex) + solvedChildren.sum, marked: solvedChildren.marked}
    # end
    case remainder do
      0 ->
        %{sum: 0, marked: solvedChildren.marked + 1}

      _ ->
        %{sum: Map.get(valuesMap, nodeIndex) + solvedChildren.sum, marked: solvedChildren.marked}
    end
  end
end

n = 5
edges = [[0, 2], [1, 2], [1, 3], [2, 4]]
values = [1, 8, 1, 4, 4]
k = 6
# 2
IO.inspect(Solution.max_k_divisible_components(n, edges, values, k))

n = 7
edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]
values = [3, 0, 6, 1, 5, 2, 1]
k = 3
# 3
IO.inspect(Solution.max_k_divisible_components(n, edges, values, k))

n = 1
edges = []
values = [0]
k = 1
# 3
IO.inspect(Solution.max_k_divisible_components(n, edges, values, k))
